import Modal from "@/components/shared/modal";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { useForm } from "react-hook-form";

const DemoModal = ({
  showDemoModal,
  setShowDemoModal,
}: {
  showDemoModal: boolean;
  setShowDemoModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const { register, handleSubmit } = useForm();

  return (
    <Modal showModal={showDemoModal} setShowModal={setShowDemoModal}>
      <div className="w-full overflow-hidden md:max-w-md md:rounded-2xl md:border md:border-gray-100 md:shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 bg-white px-4 py-6 pt-8 text-center md:px-16">
          <a href="https://precedent.dev"></a>
          <h3 className="font-display text-2xl font-bold">Add employee</h3>
          <p className="text-sm text-gray-500">
            Precedent is an opinionated collection of components, hooks, and
            utilities for your Next.js project.
          </p>
          <RegisterForm />
        </div>
      </div>
    </Modal>
  );
};

export function useDemoModal() {
  const [showDemoModal, setShowDemoModal] = useState(false);

  const DemoModalCallback = useCallback(() => {
    return (
      <DemoModal
        showDemoModal={showDemoModal}
        setShowDemoModal={setShowDemoModal}
      />
    );
  }, [showDemoModal, setShowDemoModal]);

  return useMemo(
    () => ({ setShowDemoModal, DemoModal: DemoModalCallback }),
    [setShowDemoModal, DemoModalCallback]
  );
}

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleRegistration = (data: any) => console.log(data);
  const handleError = (errors: any) => {};

  const registerOptions = {
    name: { required: "Name is required" },
    email: { required: "Email is required" },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters",
      },
    },
  };

  return (
    <form onSubmit={handleSubmit(handleRegistration, handleError)}>
      <div>
        <label>Name</label>
        <input
          name="name"
          type="text"
          {...register("name", registerOptions.name)}
        />
        <small className="text-danger">
          {errors?.name && errors.name.message}
        </small>
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          {...register("email", registerOptions.email)}
        />
        <small className="text-danger">
          {errors?.email && errors.email.message}
        </small>
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          {...register("password", registerOptions.password)}
        />
        <small className="text-danger">
          {errors?.password && errors.password.message}
        </small>
      </div>
      <button>Submit</button>
    </form>
  );
};
export default RegisterForm;
