import { Newline, Text } from "ink";
import React, { useEffect, useState } from "react";
import { CharacterForm } from "./components/CharacterForm.js";
import DndInfoClient from "./services/dnd5e.js";
import type { Race, RaceIndex, Resource, Subrace } from "./types/dnd.js";
import { defaultDict } from "./utils.js";

export default function App() {
  // const db = DBManager.getInstance().db;
  // TODO: cleanup error handling
  // if (!db) throw Error();
  const dndClient = DndInfoClient.getInstance();
  const [didLoadRaces, setDidLoadRaces] = useState(false);
  const [races, setRaces] = useState<Race[]>([]);
  const [subraces, setSubraces] = useState<Record<RaceIndex, Subrace[]>>(
    {} as Record<RaceIndex, Subrace[]>,
  );

  const loadRaces = async () => {
    const [raceData] = await dndClient.getRaces();
    const [subraceData] = await dndClient.getSubraces();

    if (raceData) {
      const subraceMap = defaultDict<Subrace[]>([]);

      raceData.forEach((r: Race) => {
        r.subraces.forEach((s: Resource) => {
          const subrace = subraceData?.find((el) => el.index === s.index);
          if (subrace) subraceMap[r.index].push(subrace);
        });
        setRaces((prev) => [...prev, r]);
        setSubraces((prev) => ({
          ...prev,
          [r.index]: subraceMap[r.index],
        }));
      });
      setDidLoadRaces(true);
    }
  };

  useEffect(() => {
    loadRaces();
  }, []);

  return (
    <>
      <Text>Welcome to Adventure Game!</Text>
      <Newline />
      {didLoadRaces && <CharacterForm races={races} subraces={subraces} />}
    </>
  );
}
