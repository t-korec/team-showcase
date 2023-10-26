"use client";

import { useState } from "react";
import Card from "./card";
import { TeamType } from "@/app/page";
import { Balancer } from "react-wrap-balancer";
import Image from "next/image";
import { cn } from "@/utils/tailwind";
import { config } from "@/lib/config/base-config";

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
          className={cn(
            "flex max-w-fit items-center justify-center space-x-2 rounded-full border",
            all
              ? "group border-black bg-black  px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
              : " border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800",
          )}
        >
          <p>All Teams</p>
        </button>
        <button
          onClick={() => setAll(false)}
          className={cn(
            "flex max-w-fit items-center justify-center space-x-2 rounded-full border",
            !all
              ? "group  border-black bg-black  px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
              : " border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800",
          )}
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
                      options,
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
                    (subTeam) => subTeam.parentTeam === team.name,
                  );

                  return (
                    <Card
                      key={team.id}
                      title={team.name}
                      team={team}
                      description={new Date(team.createdAt)?.toLocaleDateString(
                        "en-US",
                        options,
                      )}
                      subTeams={subTeams}
                    />
                  );
                })}
            </>
          )}
        </>
        <div
          onClick={() => {
            console.log(
              JSON.stringify({
                query: `
        query deleteFromEmployeeCollection {
  employeeCollection {
    edges {
      node {
        createdAt
        id
      }
    }
  }
}
      `,
              }),
            );
          }}
          className="relative col-span-1 max-h-[301px]  min-h-[293px] overflow-hidden rounded-xl border-2 border-dashed border-gray-200 bg-white/50 pb-5 opacity-60 shadow-md hover:border-gray-500 hover:opacity-100"
        >
          <div className="mx-auto flex h-full max-w-md flex-col items-center text-center ">
            <h2 className="bg-gradient-to-br from-black to-stone-500  bg-clip-text pt-10 font-display text-xl font-bold text-transparent  md:text-3xl md:font-normal">
              <Balancer>{"Add Team"}</Balancer>
            </h2>
            <div className="flex h-full w-full justify-center align-middle ">
              <div className="h-[50px] pt-10">
                <Image
                  src="/plus.png"
                  alt="Plus team"
                  width="50"
                  height="50"
                  className="opacity-50"
                ></Image>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
