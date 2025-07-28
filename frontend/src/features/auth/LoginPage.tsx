import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FormInput } from "@/shared/components/ui/FormInput";
import { Button } from "@/shared/components/ui/Button";
import { useAppDispatch } from "@/store/hooks";
import { loginThunk, registerThunk } from "@/store/slices/authSlice";
import { handleLoginSuccess } from "@/shared/middlewares/middleware";
import { Eye, EyeOff, CheckCircle } from "lucide-react";

export const LoginPage: React.FC = () => {
  const [isRegister, setIsRegister] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    ...(isRegister && {
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Please confirm your password"),
    }),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: { 
      name: "", 
      password: "",
      ...(isRegister && { confirmPassword: "" }) 
    },
  });

  type AuthPayload = {
    statusCode?: number;
    [key: string]: any;
  };

  const onSubmit = async (data: any) => {
  
    setLoading(true);
    
    try {
      const thunk = isRegister ? registerThunk : loginThunk;
      const result = (await dispatch(thunk(data))) as { payload: AuthPayload };
      
      if (result.payload?.statusCode && result.payload.statusCode >= 400) {
        return;
      }

      if (!result.payload?.access_token) {
        return;
      }

      if (isRegister) {
        setIsRegister(false);
        reset();
      } else {
        handleLoginSuccess();
      }
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  const toggleFormMode = () => {
    setIsRegister(!isRegister);
    reset();
  };

  return (
    <motion.div
      className="relative w-full overflow-hidden min-h-[100dvh] flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/login.png"
          alt="Coffee background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70" />
      </div>

      <div className="relative z-10 flex justify-between items-start p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Image
            src="/mvst-coffee-small-logo.png"
            alt="MVST Logo"
            width={166}
            height={40}
            className="filter drop-shadow-md"
          />
        </motion.div>
      </div>

      <div className="relative z-10 flex flex-1 items-center justify-center p-4 sm:p-6">
        <motion.div
          className="w-full max-w-md bg-coffee-card/60 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <div className="p-6 sm:p-8">
            <div className="text-center mb-8">
              <motion.h2 
                className="text-3xl font-bold text-white mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {isRegister ? "Create Account" : "Welcome Back"}
              </motion.h2>
             
            </div>


            <form onSubmit={handleSubmit(onSubmit)}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <FormInput
                      field={field}
                      label="Name"
                      placeholder="Enter your name"
                      error={errors.name?.message}
                      className="mb-4"
                    />
                  )}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="relative mt-4"
              >
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <FormInput
                      field={field}
                      label="Password"
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      error={errors.password?.message}
                      className="mt-4 text-sm"
                    />
                  )}
                />
                <button
                  type="button"
                  className="absolute right-3 top-10 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff style={{marginTop: "4px"}} size={18} /> : <Eye style={{marginTop: "4px"}} size={18} />}
                </button>
              </motion.div>

              {isRegister && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative mt-4"
                >
                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                      <FormInput
                        field={field}
                        label="Confirm Password"
                        placeholder="Confirm your password"
                        type="password"
                        error={errors.confirmPassword?.message}
                        className="mb-6"
                      />
                    )}
                  />
                </motion.div>
              )}

              <motion.div
                className="mt-8 flex text-center flex-col gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                <Button
                  type="submit"
                  disabled={!isValid || loading}
                >
                  {isRegister 
                    ? (loading ? "Creating account..." : "Sign Up") 
                    : (loading ? "Signing in..." : "Sign In")}
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  onClick={toggleFormMode}
                  disabled={loading}
                >
                  {isRegister 
                    ? "Already have an account? Sign In" 
                    : "Don't have an account? Sign Up"}
                </Button>
              </motion.div>
            </form>

          </div>
          
        </motion.div>
      </div>
    </motion.div>
  );
};