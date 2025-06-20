import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Ship, User, Lock, Eye, EyeOff, LogIn, Phone, Shield, Clock, TriangleAlert, CheckCircle, Loader2, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "wouter";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

const loginSchema = z.object({
  email: z.string().min(3, "El usuario debe tener al menos 3 caracteres"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  rememberMe: z.boolean().default(false),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await apiRequest("POST", "/api/auth/login", {
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });
      return response.json();
    },
    onSuccess: (data) => {
      setLoginError(null);
      setLoginSuccess("Inicio de sesión exitoso. Redirigiendo...");
      
      // Redirect based on email domain
      setTimeout(() => {
        const emailDomain = form.getValues("email").split("@")[1];
        if (emailDomain === "aduana.com") {
          window.location.href = '/admin-dashboard';
        } else {
          window.location.href = '/user-home';
        }
      }, 1500);
    },
    onError: (error: Error) => {
      setLoginSuccess(null);
      setLoginError("Credenciales incorrectas. Por favor, verifique su usuario y contraseña.");
      
      toast({
        title: "Error de autenticación",
        description: "Las credenciales proporcionadas no son válidas",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LoginFormData) => {
    setLoginError(null);
    setLoginSuccess(null);
    loginMutation.mutate(data);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen customs-gradient flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Header Section with Branding */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-between items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Inicio
            </Button>
          </Link>
          
          <div className="flex justify-center">
            {/* Company Logo */}
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <Ship className="text-white w-8 h-8" />
            </div>
          </div>
          
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>
        <h1 className="text-center text-3xl font-bold tracking-tight text-slate-900">
          ADUANA GLOBAL
        </h1>
        <p className="text-center text-lg text-slate-600 font-medium mt-2">
          Servicios Aduaneros Profesionales
        </p>
        <h2 className="mt-8 text-center text-2xl font-semibold tracking-tight text-gray-900">
          Portal Empresarial
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Acceda a su cuenta para gestionar operaciones aduaneras
        </p>
      </div>

      {/* Login Form Section */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="customs-card-shadow border-slate-200">
          <CardContent className="py-8 px-6 sm:px-10">
            {/* Error Message */}
            {loginError && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border-l-4 border-red-400">
                <div className="flex">
                  <TriangleAlert className="h-5 w-5 text-red-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-red-700">{loginError}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Success Message */}
            {loginSuccess && (
              <div className="mb-6 p-4 rounded-lg bg-green-50 border-l-4 border-green-400">
                <div className="flex">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-green-700">{loginSuccess}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Login Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Email/Username Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Usuario o Correo Electrónico
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            {...field}
                            type="text"
                            placeholder="usuario@empresa.com"
                            className="pl-10 py-3 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Contraseña
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10 pr-12 py-3 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                          />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition duration-200"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-sm text-gray-700 font-normal">
                          Recordar sesión
                        </FormLabel>
                      </FormItem>
                    )}
                  />

                  <div className="text-sm">
                    <a href="#" className="font-medium text-primary hover:text-blue-800 transition duration-200">
                      ¿Olvidó su contraseña?
                    </a>
                  </div>
                </div>

                {/* Submit Button */}
                <div>
                  <Button
                    type="submit"
                    disabled={loginMutation.isPending}
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-200 customs-button-shadow"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      {loginMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin text-blue-300" />
                      ) : (
                        <LogIn className="h-4 w-4 text-blue-300 group-hover:text-blue-200" />
                      )}
                    </span>
                    {loginMutation.isPending ? "Iniciando sesión..." : "Iniciar Sesión"}
                  </Button>
                </div>
              </form>
            </Form>

            {/* Additional Links */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="text-center space-y-3">
                <p className="text-sm text-slate-600">
                  ¿No tiene una cuenta?
                </p>
                <Link href="/register" className="inline-flex items-center text-sm font-medium text-primary hover:text-blue-800 transition duration-200">
                  <User className="h-4 w-4 mr-2" />
                  Registrarse
                </Link>
                <div className="mt-3">
                  <a href="#" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-blue-800 transition duration-200">
                    <Phone className="h-4 w-4 mr-2" />
                    Contactar Administrador
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Information */}
        <div className="mt-8 text-center">
          <div className="flex justify-center items-center space-x-6 text-sm text-slate-600 mb-4">
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-2 text-green-600" />
              Conexión Segura
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-primary" />
              24/7 Disponible
            </div>
          </div>
          <p className="text-xs text-gray-500">
            © 2024 Aduana Global. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Sistema certificado para operaciones aduaneras
          </p>
        </div>
      </div>
    </div>
  );
}
