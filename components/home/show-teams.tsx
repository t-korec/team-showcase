"use client";

import { useState } from "react";
import Card from "./card";
import { TeamType } from "@/app/page";

const options: Intl.DateTimeFormatOptions = {
  weekday: "long" as "long" | "short" | "narrow",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export default function ShowTeams({ teams }: { teams: TeamType[] }) {
  const [all, setAll] = useState(false);
  return (
    <>
      <div
        className="mx-auto mt-6 flex animate-fade-up items-center justify-center space-x-5 opacity-0"
        style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
      >
        <button
          onClick={() => setAll(true)}
          className={
            all
              ? "group flex bg-black max-w-fit items-center justify-center space-x-2 rounded-full border border-black  px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
              : "flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800"
          }
        >
          <p>All Teams</p>
        </button>
        <button
          onClick={() => setAll(false)}
          className={
            !all
              ? "group flex bg-black max-w-fit items-center justify-center space-x-2 rounded-full border border-black  px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
              : "flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800"
          }
        >
          <p>
            <span className=" inline-block">Hierarchy</span>
          </p>
        </button>
      </div>
      <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
        <>
          {all ? (
            <>
              {teams?.map((team) => {
                return (
                  <Card
                    key={team.id}
                    title={team.name}
                    team={team}
                    description={new Date(team.createdAt)?.toLocaleDateString(
                      "en-US",
                      options
                    )}
                  />
                );
              })}
            </>
          ) : (
            <>
              {teams
                ?.filter((team) => team.parentTeam == null)
                .map((team) => {
                  const subTeams = teams.filter(
                    (aTeam) => aTeam.parentTeam === team.id
                  );

                  return (
                    <Card
                      key={team.id}
                      title={team.name}
                      team={team}
                      description={new Date(team.createdAt)?.toLocaleDateString(
                        "en-US",
                        options
                      )}
                      subTeams={subTeams}
                    />
                  );
                })}
            </>
          )}
        </>
      </div>
    </>
  );
}
