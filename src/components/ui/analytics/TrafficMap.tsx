import React, { useEffect } from "react";
// import { ReactTooltip } from "react-tooltip";

// Расширяем интерфейс Window для добавления свойств simplemaps_worldmap
declare global {
  interface Window {
    simplemaps_worldmap: {
      mapdata: any;
      refresh: () => void;
    };
    simplemaps_worldmap_mapdata: {
      main_settings: {
        state_url?: string;
        state_description?: string;
        state_color?: string;
        state_hover_color?: string;
        disable_click?: boolean;
        popups?: boolean;
        zoom?: boolean; // Добавляем настройку для зума
        manualZoom?: boolean; // Для отключения зума через колёсико
        zoom_buttons?: boolean; // Для отключения кнопок зума
      };
      state_specific: {
        [key: string]: {
          name: string;
          color?: string;
          hover_color?: string;
          description?: string;
          url?: string;
        };
      };
    };
  }
}

interface TrafficGeography {
  russia: number;
  usa: number;
  europe: number;
  asia: number;
  other: number;
}

interface TrafficMapProps {
  trafficGeography: TrafficGeography;
}

const TrafficMap: React.FC<TrafficMapProps> = ({ trafficGeography }) => {
  // Функция для определения цвета на основе процента
  const getColor = (value: number) => {
    return value > 75 ? "#1e540c" : // Ярко-красный
      value > 50 ? "#2ea412" : // Светло-красный
        value > 25 ? "#28bb46" : // Розовый
          value > 10 ? "#89b98d" : // Светло-розовый
            value > 0  ? "#b5e0ab" : // Очень светлый
              "#FFFFFF";  // Белый (если 0)
  };

  // Легенда с градацией цветов
  const legendColors = [
    { label: ">75%", color: "#FF4D4D" },
    { label: "50-75%", color: "#FF6B6B" },
    { label: "25-50%", color: "#FF9999" },
    { label: "10-25%", color: "#FFB6B6" },
    { label: "0-10%", color: "#FFDADA" },
  ];

  // Сопоставление стран с регионами (на основе полного названия)
  const getRegion = (countryName: string): string => {
    const name = countryName.toLowerCase();
    // Россия
    if (name === "russia" || name === "russian federation") return "russia";
    // США (включая Канаду)
    if (name === "united states" || name === "canada") return "usa";
    // Европа
    if ([
      "switzerland", "germany", "france", "italy", "spain", "united kingdom", "poland",
      "netherlands", "sweden", "finland", "norway", "denmark", "belgium", "austria",
      "ireland", "portugal", "greece", "czech republic", "hungary", "romania", "bulgaria",
      "croatia", "slovenia", "slovakia", "lithuania", "latvia", "estonia", "albania",
      "bosnia and herzegovina", "belarus", "austria", "czechia"
    ].includes(name)) return "europe";
    // Азия
    if ([
      "china", "japan", "india", "south korea", "thailand", "vietnam", "indonesia",
      "malaysia", "philippines", "singapore", "taiwan", "pakistan", "bangladesh",
      "sri lanka", "nepal", "cambodia", "myanmar", "laos", "mongolia", "north korea",
      "afghanistan", "united arab emirates", "bahrain", "brunei darussalam", "bhutan",
      "armenia", "azerbaijan", "georgia", "kazakhstan", "kyrgyzstan", "tajikistan",
      "turkmenistan", "uzbekistan"
    ].includes(name)) return "asia";
    // Остальной мир
    return "other";
  };

  // Функция для получения процента трафика для региона
  const getTrafficValue = (region: string): number => {
    switch (region) {
      case "russia": return trafficGeography.russia;
      case "usa": return trafficGeography.usa;
      case "europe": return trafficGeography.europe;
      case "asia": return trafficGeography.asia;
      default: return trafficGeography.other;
    }
  };

  // Модификация данных карты после загрузки
  useEffect(() => {
    // Загружаем скрипты
    const script1 = document.createElement("script");
    script1.src = "/maps/mapdata.js"; // Относительный путь для public
    const script2 = document.createElement("script");
    script2.src = "/maps/worldmap.js"; // Относительный путь для public
    document.head.appendChild(script1);
    document.head.appendChild(script2);

    // Ждём загрузки карты и модифицируем данные
    script2.onload = () => {
      if (window.simplemaps_worldmap && window.simplemaps_worldmap_mapdata) {
        const mapData = window.simplemaps_worldmap_mapdata;

        // Отключаем переход по клику
        mapData.main_settings = {
          ...mapData.main_settings,
          state_url: "", // Убираем URL
          disable_click: true, // Отключаем кликабельность
          popups: "onhover", // Включаем всплывающие подсказки при наведении
        };

        // Модифицируем данные для каждой страны
        Object.keys(mapData.state_specific).forEach((stateId) => {
          const state = mapData.state_specific[stateId];
          const region = getRegion(state.name);
          const trafficValue = getTrafficValue(region);
          // Отладка: выводим в консоль, чтобы проверить
          console.log(`Country: ${state.name}, Region: ${region}, Value: ${trafficValue}%`);
          state.color = getColor(trafficValue);
          state.hover_color = getColor(trafficValue);
          state.description = `${state.name}: ${trafficValue}%`; // Тултип
          state.url = ""; // Убираем URL для клика
        });

        // Перерисовываем карту
        if (window.simplemaps_worldmap.refresh) {
          window.simplemaps_worldmap.refresh();
        }
      }
    };

    // Очистка
    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, [trafficGeography]);

  return (
    <div className="map-container">
      {/* Карта и легенда в flex-контейнере */}
      <div className="map-layout">
        {/* Карта */}
        <div className="map-wrapper">
          <div id="map" className="world-map"></div>
        </div>
        {/* Легенда под картой */}
        <div className="flex gap-5 items-center justify-center">
          {/*{legendColors.map((item) => (*/}
          {/*  <div key={item.label} className="legend-item">*/}
          {/*    <span style={{ backgroundColor: item.color }} className="legend-color"></span>*/}
          {/*    <span className="text-sm text-gray-600 dark:text-gray-200">{item.label}</span>*/}
          {/*  </div>*/}
          {/*))}*/}
          {/* Показываем проценты для каждого региона */}
            {Object.entries(trafficGeography).map(([region, value]) => (
              <div key={region} className="legend-item mt-3">
                <span style={{ backgroundColor: getColor(value) }} className="inline-block mr-2 rounded-sm w-3 h-3"></span>
                <span className="text-sm text-gray-600 dark:text-gray-200 capitalize">
                                    {region}: {value}%
                                </span>
              </div>
            ))}
        </div>
      </div>

      {/*/!* Тултип (оставляем на случай, если встроенные тултипы не сработают) *!/*/}
      {/*<ReactTooltip*/}
      {/*  id="map-tooltip"*/}
      {/*  place="top"*/}
      {/*  className="custom-tooltip"*/}
      {/*  getContent={(dataTip) => {*/}
      {/*    if (dataTip) {*/}
      {/*      const [regionName, percentage] = dataTip.split(": ");*/}
      {/*      return `${regionName}: ${percentage}`;*/}
      {/*    }*/}
      {/*    return null;*/}
      {/*  }}*/}
      {/*/>*/}
    </div>
  );
};

export default TrafficMap;