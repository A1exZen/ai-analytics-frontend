import React, { useEffect } from "react";
// import { ReactTooltip } from "react-tooltip";

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
        zoom?: boolean;
        manualZoom?: boolean;
        zoom_buttons?: boolean;
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
    return value > 75 ? "#1e540c" :
      value > 50 ? "#2ea412" :
        value > 25 ? "#28bb46" :
          value > 10 ? "#89b98d" :
            value > 0  ? "#b5e0ab" :
              "#FFFFFF";
  };

  const legendColors = [
    { label: ">75%", color: "#FF4D4D" },
    { label: "50-75%", color: "#FF6B6B" },
    { label: "25-50%", color: "#FF9999" },
    { label: "10-25%", color: "#FFB6B6" },
    { label: "0-10%", color: "#FFDADA" },
  ];

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
    return "other";
  };

  const getTrafficValue = (region: string): number => {
    switch (region) {
      case "russia": return trafficGeography.russia;
      case "usa": return trafficGeography.usa;
      case "europe": return trafficGeography.europe;
      case "asia": return trafficGeography.asia;
      default: return trafficGeography.other;
    }
  };

  useEffect(() => {
    // Загружаем скрипты
    const script1 = document.createElement("script");
    script1.src = "/maps/mapdata.js";
    const script2 = document.createElement("script");
    script2.src = "/maps/worldmap.js";
    document.head.appendChild(script1);
    document.head.appendChild(script2);

    script2.onload = () => {
      if (window.simplemaps_worldmap && window.simplemaps_worldmap_mapdata) {
        const mapData = window.simplemaps_worldmap_mapdata;

        mapData.main_settings = {
          ...mapData.main_settings,
          state_url: "",
          disable_click: true,
          popups: "onhover",
        };

        Object.keys(mapData.state_specific).forEach((stateId) => {
          const state = mapData.state_specific[stateId];
          const region = getRegion(state.name);
          const trafficValue = getTrafficValue(region);
          console.log(`Country: ${state.name}, Region: ${region}, Value: ${trafficValue}%`);
          state.color = getColor(trafficValue);
          state.hover_color = getColor(trafficValue);
          state.description = `${state.name}: ${trafficValue}%`;
          state.url = "";
        });

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
      <div className="map-layout">
        <div className="map-wrapper">
          <div id="map" className="world-map"></div>
        </div>
        <div className="flex gap-5 items-center justify-center">

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

    </div>
  );
};

export default TrafficMap;