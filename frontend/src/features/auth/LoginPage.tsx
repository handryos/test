import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image";
import { motion } from "framer-motion";
import { FormInput } from "@/shared/components/ui/FormInput";
import { Button } from "@/shared/components/ui/Button";
import { useAppDispatch } from "@/store/hooks";
import { loginThunk, registerThunk } from "@/store/slices/authSlice";
import { handleLoginSuccess } from "@/features/auth/middlewares/middleware";

export const LoginPage: React.FC = () => {
  const [isRegister, setIsRegister] = React.useState(false);
  const dispatch = useAppDispatch();
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: { name: "", password: "" },
  });

  type AuthPayload = {
    statusCode?: number;
    [key: string]: any;
  };

  const onSubmit = async (data: any) => {
    setErrorMsg(null);
    setLoading(true);
    try {
      const thunk = isRegister ? registerThunk : loginThunk;
      const result = (await dispatch(thunk(data))) as { payload: AuthPayload };
      console.log(result);
      if (!result.payload?.access_token) {
        return;
      } else {
        handleLoginSuccess();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="relative w-full overflow-hidden h-[100dvh] min-h-[500px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute  inset-0 z-0">
        <Image
          src="/login.png"
          alt="Coffee background"
          width={1920}
          height={1080}
          className="md:object-cover w-full h-full"
        />
      </div>
      <div className="relative z-10 h-full  w-full max-w-[1440px] mx-auto grid grid-cols-12 ">
        <motion.div
          className="col-span-12 flex justify-between ml-6 items-start mb-6 py-4 md:py-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Image
            src="/mvst-coffee-small-logo.png"
            alt="MVST Logo"
            width={166}
            height={25}
            style={{ width: "100%", height: "auto" }}
          />
        </motion.div>
        <div className="col-span-12 md:col-span-6 flex mb-12 flex-col justify-start md:justify-center">
          <div className="relative w-full justify-start min-h-[200px] md:mb-32 md:min-h-[350px] flex-1 px-8 md:px-0">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-4 w-full max-w-md"
            >
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <FormInput
                    inputClassName="h-14 bg-[rgba(41,41,41,0.15)]"
                    field={field}
                    label="Name"
                    error={errors.name?.message}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <FormInput
                    inputClassName="h-14 bg-[rgba(41,41,41,0.15)]"
                    field={field}
                    label="Password"
                    type="password"
                    error={errors.password?.message}
                  />
                )}
              />
              <div className="flex justify-start space-x-3 mt-4">
                {!isRegister ? (
                  <>
                    <Button type="submit">
                      {loading ? "Entrando..." : "Login"}
                    </Button>
                    <Button
                      variant="secondary"
                      type="button"
                      onClick={() => setIsRegister(true)}
                    >
                      Register
                    </Button>
                  </>
                ) : (
                  <>
                    <Button type="submit">
                      {loading ? "Registrando..." : "Register"}
                    </Button>
                    <Button
                      variant="secondary"
                      type="button"
                      onClick={() => setIsRegister(false)}
                    >
                      Back to login
                    </Button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
