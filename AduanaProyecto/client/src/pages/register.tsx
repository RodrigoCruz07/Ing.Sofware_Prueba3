import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Ship, User, Mail, Phone, IdCard, Eye, EyeOff, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";

const registerSchema = z.object({
  firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  email: z.string().email("Debe ingresar un email válido"),
  phone: z.string().min(8, "El número de teléfono debe tener al menos 8 dígitos"),
  rut: z.string().min(8, "El RUT debe tener al menos 8 caracteres").max(12, "El RUT no puede tener más de 12 caracteres"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmPassword: z.string().min(6, "Confirme su contraseña"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      rut: "",
      password: "",
      confirmPassword: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const response = await apiRequest("POST", "/api/auth/register", {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        rut: data.rut,
        password: data.password,
      });
      return response.json();
    },
    onSuccess: (data) => {
      setRegisterSuccess("Registro exitoso. Ahora puede iniciar sesión con sus credenciales.");
      
      toast({
        title: "Registro completado",
        description: "Su cuenta ha sido creada exitosamente",
        variant: "default",
      });

      // Redirect to login after 3 seconds
      setTimeout(() => {
        window.location.href = '/login';
      }, 3000);
    },
    onError: (error: Error) => {
      toast({
        title: "Error en el registro",
        description: "Ha ocurrido un error al crear la cuenta. Intente nuevamente.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="min-h-screen customs-gradient flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Header Section with Branding */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center shadow-lg">
            <Ship className="text-white w-8 h-8" />
          </div>
        </div>
        <h1 className="text-center text-3xl font-bold tracking-tight text-slate-900">
          SERVICIO NACIONAL DE ADUANAS
        </h1>
        <p className="text-center text-lg text-slate-600 font-medium mt-2">
          República de Chile
        </p>
        <h2 className="mt-8 text-center text-2xl font-semibold tracking-tight text-gray-900">
          Crear Nueva Cuenta
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Complete el formulario para acceder a los servicios aduaneros
        </p>
      </div>

      {/* Registration Form Section */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="customs-card-shadow border-slate-200">
          <CardContent className="py-8 px-6 sm:px-10">
            {/* Back to Login Link */}
            <div className="mb-6">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver al Login
                </Button>
              </Link>
            </div>

            {/* Success Message */}
            {registerSuccess && (
              <div className="mb-6 p-4 rounded-lg bg-green-50 border-l-4 border-green-400">
                <div className="flex">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-green-700">{registerSuccess}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Registration Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* First Name */}
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Nombre
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            {...field}
                            type="text"
                            placeholder="Juan"
                            className="pl-10 py-3 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Last Name */}
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Apellido
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            {...field}
                            type="text"
                            placeholder="Pérez"
                            className="pl-10 py-3 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Correo Electrónico
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            {...field}
                            type="email"
                            placeholder="juan.perez@gmail.com"
                            className="pl-10 py-3 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Número de Teléfono
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            {...field}
                            type="tel"
                            placeholder="+56 9 1234 5678"
                            className="pl-10 py-3 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* RUT */}
                <FormField
                  control={form.control}
                  name="rut"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        RUT
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <IdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            {...field}
                            type="text"
                            placeholder="12.345.678-9"
                            className="pl-10 py-3 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
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
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pr-12 py-3 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
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

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Confirmar Contraseña
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pr-12 py-3 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition duration-200"
                          >
                            {showConfirmPassword ? (
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

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={registerMutation.isPending}
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-200 customs-button-shadow"
                  >
                    {registerMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Creando cuenta...
                      </>
                    ) : (
                      "Crear Cuenta"
                    )}
                  </Button>
                </div>
              </form>
            </Form>

            {/* Login Link */}
            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-slate-600">
                ¿Ya tiene una cuenta?{" "}
                <Link href="/login" className="font-medium text-primary hover:text-blue-800 transition duration-200">
                  Iniciar Sesión
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}