import ShowTeams from "@/components/home/show-teams";
import { Balancer } from "react-wrap-balancer";

import { z } from "zod";

export interface Employee {
  id: string;
  createdAt: Date;
  name: string;
  surname: string;
  startDate: Date | null;
  endDate: Date | null;
  team: string;
  position: null | string;
}

const employeeSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  name: z.string(),
  surname: z.string(),
  startDate: z.string().nullish(),
  endDate: z.string().nullish(),
  team: z.string(),
  position: z.string().nullish(),
});

const teamSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  name: z.string(),
  parentTeam: z.string().nullish(),
  employees: z.array(employeeSchema),
});
const teamsSchema = z.array(teamSchema);

export type TeamType = z.infer<typeof teamSchema>;
export type EmployeeType = z.infer<typeof employeeSchema>;

async function getTeams() {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    apikey: process.env.TOKEN,
    Authorization: `Bearer ${process.env.TOKEN}`,
  };

  let response = await fetch(
    "https://nktebdhspzvpwguqcksn.supabase.co/rest/v1/teams?select=*%2Cemployees(*)",
    {
      method: "GET",
      headers: headersList,
    }
  );

  const data = teamsSchema.safeParse(await response.json());
  if (!data.success) {
    const { errors } = data.error;
    console.error(errors);
    return null;
  }

  return data.data;
}

async function createEmployee(username: string) {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    apikey: process.env.TOKEN,
    Authorization: `Bearer ${process.env.TOKEN}`,
    "Content-Type": "application/json",
    Prefer: "return=minimal",
  };

  let bodyContent = JSON.stringify({
    name: "Gabriela",
    surname: "Konečná",
    startDate: "2018-01-01",
    endDate: "2022-03-31",
    team: "ada9b82b-8dad-4573-b3e8-1bf22ce822a6",
    position: "cto",
  });

  let response = await fetch(
    "https://nktebdhspzvpwguqcksn.supabase.co/rest/v1/employees",
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );
}

export default async function Home() {
  const teams = await getTeams();

  return (
    <>
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        <a
          href=""
          target="_blank"
          rel="noreferrer"
          className="mx-auto mb-5 flex max-w-fit animate-fade-up items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-colors hover:bg-blue-200"
        >
          <p className="text-sm font-semibold text-[#02D076]">GitHub repo</p>
        </a>
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <Balancer>Managing Teams reinvented</Balancer>
        </h1>
        <p
          className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <Balancer>
            Unleash the X-Factor of Organizational Insights Dive into our
            Cutting-Edge Web App and Uncover the Hidden Dynamics of Your
            Company's DNA!
          </Balancer>
        </p>
      </div>
      <ShowTeams teams={teams} />
    </>
  );
}
