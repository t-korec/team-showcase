"use client";

import { TeamType } from "@/app/page";
import { ReactNode, useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";

import Balancer from "react-wrap-balancer";
import { useDemoModal } from "./demo-modal";
import Tooltip from "../shared/tooltip";

export default function Card({
  title,
  description,
  demo,
  large,
  subTeams,
  team,
}: {
  title: string;
  team: TeamType;
  description: string;
  demo?: ReactNode;
  large?: boolean;
  subTeams?: TeamType[];
}) {
  const { DemoModal, setShowDemoModal } = useDemoModal(team);
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`pb-5 relative col-span-1 h-fit overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md ${
        large ? "md:col-span-2" : ""
      }`}
    >
      {demo && (
        <div className="flex h-60 items-center justify-center">{demo}</div>
      )}

      <div className="mx-auto max-w-md text-center flex flex-col items-center">
        <h2 className="pt-10 bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display text-xl font-bold text-transparent md:text-3xl md:font-normal">
          <Balancer>{title}</Balancer>
        </h2>
        <div className="-mt-2 leading-normal text-gray-500 py-5">
          <Balancer>{description}</Balancer>
        </div>

        {subTeams && (
          <div className="flex flex-col">
            <div>Subteams</div>
            <div className="flex gap-2 pt-2">
              {subTeams.map((subTeam) => {
                if (subTeam.name.length > 9) {
                  return (
                    <Tooltip key={subTeam.id} content={subTeam.name}>
                      <div
                        key={subTeam.id}
                        className={`relative w-14 h-14 overflow-hidden flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800`}
                      >
                        <p className="text-gray-600 text-ellipsis overflow-hidden whitespace-nowrap">
                          {subTeam.name}
                        </p>
                      </div>
                    </Tooltip>
                  );
                }

                return (
                  <div
                    key={subTeam.id}
                    className={`relative w-14 h-14 overflow-hidden flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800`}
                  >
                    <h3>
                      <Balancer>{subTeam.name}</Balancer>
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {team?.employees && (
          <div className="flex flex-col w-full px-5 py-5">
            <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700 text-left">
              <Collapsible.Root open={open} onOpenChange={setOpen}>
                <div className="flex items-center justify-between px-4">
                  <Collapsible.Trigger asChild>
                    <button
                      type="button"
                      onClick={() => setOpen(!open)}
                      className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
                      data-accordion-target="#accordion-flush-body-1"
                      aria-expanded="true"
                      aria-controls="accordion-flush-body-1"
                    >
                      <span>Employees</span>
                      <svg
                        data-accordion-icon
                        className={`w-3 h-3 shrink-0 ${
                          open ? " " : "rotate-180"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5 5 1 1 5"
                        />
                      </svg>
                    </button>
                  </Collapsible.Trigger>
                </div>

                <Collapsible.Content>
                  {team.employees.map((emp) => {
                    return (
                      <li key={emp.id} className="">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            {/*  <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image"> */}
                          </div>
                          <div className="flex-1 min-w-0 py-2">
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                              {`${emp.name} ${emp.surname}`}
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                              {emp.position}
                            </p>
                          </div>
                          <div className="inline-flex items-center text-base text-gray-900 dark:text-white"></div>
                        </div>
                      </li>
                    );
                  })}
                </Collapsible.Content>
              </Collapsible.Root>
            </ul>
          </div>
        )}
        <DemoModal />
        <button
          onClick={() => setShowDemoModal(true)}
          className="flex w-36 items-center justify-center rounded-md border border-gray-300 px-3 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100"
        >
          <p className="text-gray-600">Add Employee</p>
        </button>
      </div>
    </div>
  );
}
