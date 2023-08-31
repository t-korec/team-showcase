import { EmployeeForm, TeamType } from "@/app/page";
import Modal from "@/components/shared/modal";
import { config } from "@/lib/config/base-config";
import { useRouter } from "next/navigation";

import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { useForm } from "react-hook-form";

async function createEmployee(
  name: string,
  surname: string,
  teamId: number,
  position: string
) {
  const apiToken = process.env.TOKEN;

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  requestHeaders.set("Prefer", "return=minimal");

  if (apiToken) {
    requestHeaders.set("apikey", apiToken);
    requestHeaders.set("Authorization", `Bearer ${apiToken}`);
    let bodyContent = JSON.stringify({
      name,
      surname,
      team: teamId,
      position,
    });

    await fetch(`${config.url}/Employee`, {
      method: "POST",
      body: bodyContent,
      headers: requestHeaders,
    });
  }
}

const DemoModal = ({
  team,
  showDemoModal,
  setShowDemoModal,
}: {
  team: TeamType;
  showDemoModal: boolean;
  setShowDemoModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  return (
    <Modal showModal={showDemoModal} setShowModal={setShowDemoModal}>
      <div className="w-full overflow-hidden md:max-w-md md:rounded-2xl md:border md:border-gray-100 md:shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 bg-white px-4 py-6 pt-8 text-center md:px-16">
          <a href="https://precedent.dev"></a>
          <h3 className="font-display text-2xl font-bold pb-4">
            Add employee to <span className="text-[#02D076]">{team.name}</span>{" "}
            team
          </h3>
          <RegisterForm
            onSubmit={(data) => {
              createEmployee(data.name, data.surname, team.id, data.position);
              //this will reload the page without doing SSR
              setShowDemoModal(false);
              router.push(window.location.href);
            }}
            onCancel={() => setShowDemoModal(false)}
          />
        </div>
      </div>
    </Modal>
  );
};

export function useDemoModal(team: TeamType) {
  const [showDemoModal, setShowDemoModal] = useState(false);

  const DemoModalCallback = useCallback(() => {
    return (
      <DemoModal
        team={team}
        showDemoModal={showDemoModal}
        setShowDemoModal={setShowDemoModal}
      />
    );
  }, [team, showDemoModal, setShowDemoModal]);

  return useMemo(
    () => ({ setShowDemoModal, DemoModal: DemoModalCallback }),
    [setShowDemoModal, DemoModalCallback]
  );
}

const RegisterForm = ({
  onSubmit,
  onCancel,
}: {
  onSubmit: (data: EmployeeForm) => void;
  onCancel: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeForm>();
  const handleRegistration = (data: EmployeeForm) => {
    onSubmit(data);
  };

  const registerOptions = {
    name: { required: "Name is required" },
    surname: { required: "Surname is required" },
  };

  return (
    <form onSubmit={handleSubmit(handleRegistration)}>
      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Name *
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            type="text"
            {...register("name", registerOptions.name)}
          />
          <small className="text-red-500">
            {errors?.name && errors.name.message}
          </small>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Surname *
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            type="text"
            {...register("surname", registerOptions.surname)}
          />
          <small className="text-red-500">
            {errors?.surname && errors.surname.message}
          </small>
        </div>

        <div className="col-span-full">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Position
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            type="text"
            {...register("position")}
          />
        </div>
      </div>
      <div className="flex items-center space-x-4 justify-end">
        <button
          onClick={onCancel}
          type="button"
          className="text-gray-500 inline-flex items-center hover:text-white border border-gray-600 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-[#10BFFC] text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Add
        </button>
      </div>
    </form>
  );
};
export default RegisterForm;
