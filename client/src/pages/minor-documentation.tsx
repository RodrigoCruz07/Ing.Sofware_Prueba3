import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, 
  ArrowLeft, 
  Baby, 
  User, 
  Calendar, 
  MapPin, 
  FileText,
  Upload,
  CheckCircle,
  Loader2,
  AlertCircle
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const minorDocumentationSchema = z.object({
  minorName: z.string().min(2, "El nombre del menor debe tener al menos 2 caracteres"),
  minorLastName: z.string().min(2, "El apellido del menor debe tener al menos 2 caracteres"),
  minorRut: z.string().min(8, "El RUT del menor debe tener al menos 8 caracteres"),
  birthDate: z.string().min(1, "La fecha de nacimiento es requerida"),
  nationality: z.string().min(1, "La nacionalidad es requerida"),
  
  // Guardian/Parent information
  guardianName: z.string().min(2, "El nombre del tutor/padre debe tener al menos 2 caracteres"),
  guardianLastName: z.string().min(2, "El apellido del tutor/padre debe tener al menos 2 caracteres"),
  guardianRut: z.string().min(8, "El RUT del tutor/padre debe tener al menos 8 caracteres"),
  guardianPhone: z.string().min(8, "El teléfono debe tener al menos 8 dígitos"),
  relationship: z.string().min(1, "La relación con el menor es requerida"),
  
  // Travel information
  travelType: z.string().min(1, "El tipo de viaje es requerido"),
  destinationCountry: z.string().min(1, "El país de destino es requerido"),
  travelPurpose: z.string().min(10, "El propósito del viaje debe ser más específico"),
  departureDate: z.string().min(1, "La fecha de salida es requerida"),
  returnDate: z.string().optional(),
  
  // Accommodation
  accommodationAddress: z.string().min(10, "La dirección de alojamiento debe ser más específica"),
  contactPersonAbroad: z.string().min(2, "El contacto en el extranjero es requerido"),
  contactPhoneAbroad: z.string().min(8, "El teléfono de contacto debe tener al menos 8 dígitos"),
  
  // Additional information
  additionalInfo: z.string().optional(),
});

type MinorDocumentationFormData = z.infer<typeof minorDocumentationSchema>;

export default function MinorDocumentation() {
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const form = useForm<MinorDocumentationFormData>({
    resolver: zodResolver(minorDocumentationSchema),
    defaultValues: {
      minorName: "",
      minorLastName: "",
      minorRut: "",
      birthDate: "",
      nationality: "",
      guardianName: "",
      guardianLastName: "",
      guardianRut: "",
      guardianPhone: "",
      relationship: "",
      travelType: "",
      destinationCountry: "",
      travelPurpose: "",
      departureDate: "",
      returnDate: "",
      accommodationAddress: "",
      contactPersonAbroad: "",
      contactPhoneAbroad: "",
      additionalInfo: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: MinorDocumentationFormData) => {
      // Simulate file upload and form submission
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      
      uploadedFiles.forEach((file, index) => {
        formData.append(`document_${index}`, file);
      });

      const response = await apiRequest("POST", "/api/procedures/minor-documentation", formData);
      return response.json();
    },
    onSuccess: (data) => {
      setSubmitSuccess("Solicitud enviada exitosamente. Recibirá confirmación por email.");
      
      toast({
        title: "Solicitud enviada",
        description: "Su solicitud de documentación para menor ha sido procesada",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error al enviar solicitud",
        description: "Ha ocurrido un error. Intente nuevamente.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: MinorDocumentationFormData) => {
    submitMutation.mutate(data);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                <Shield className="text-white w-5 h-5" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Documentación para Menores de Edad</h1>
            </div>
            <Link href="/user-home">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Chilean Flag Banner */}
      <div className="w-full h-8 relative overflow-hidden">
        <div className="absolute inset-0 flex">
          <div className="w-1/3 bg-blue-600"></div>
          <div className="w-1/3 bg-white flex items-center justify-center">
            <div className="text-blue-600 text-lg">★</div>
          </div>
          <div className="w-1/3 bg-red-600"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Baby className="text-pink-600 w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Automatización de Documentación para Menores
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Complete este formulario para automatizar la documentación necesaria para la entrada y salida de menores de edad del país
          </p>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="mb-8 p-4 rounded-lg bg-green-50 border-l-4 border-green-400">
            <div className="flex">
              <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5" />
              <div>
                <p className="text-sm text-green-700">{submitSuccess}</p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                {/* Minor Information */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Baby className="h-5 w-5 mr-2 text-pink-600" />
                    Información del Menor
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="minorName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre del Menor</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Nombre" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="minorLastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Apellido del Menor</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Apellido" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="minorRut"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>RUT del Menor</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="12.345.678-9" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="birthDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fecha de Nacimiento</FormLabel>
                          <FormControl>
                            <Input {...field} type="date" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="nationality"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nacionalidad</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Chilena" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Guardian Information */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2 text-blue-600" />
                    Información del Tutor/Padre/Madre
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="guardianName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre del Tutor</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Nombre" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="guardianLastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Apellido del Tutor</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Apellido" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="guardianRut"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>RUT del Tutor</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="12.345.678-9" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="guardianPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teléfono de Contacto</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="+56 9 1234 5678" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="relationship"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Relación con el Menor</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccione relación" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="padre">Padre</SelectItem>
                              <SelectItem value="madre">Madre</SelectItem>
                              <SelectItem value="tutor">Tutor Legal</SelectItem>
                              <SelectItem value="abuelo">Abuelo/a</SelectItem>
                              <SelectItem value="tio">Tío/a</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Travel Information */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-green-600" />
                    Información del Viaje
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="travelType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de Viaje</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccione tipo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="tourism">Turismo</SelectItem>
                              <SelectItem value="family">Visita Familiar</SelectItem>
                              <SelectItem value="education">Educativo</SelectItem>
                              <SelectItem value="medical">Médico</SelectItem>
                              <SelectItem value="other">Otro</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="destinationCountry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>País de Destino</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Ej: Argentina" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="departureDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fecha de Salida</FormLabel>
                          <FormControl>
                            <Input {...field} type="date" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="returnDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fecha de Regreso (Opcional)</FormLabel>
                          <FormControl>
                            <Input {...field} type="date" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="travelPurpose"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Propósito del Viaje</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              placeholder="Describa detalladamente el propósito del viaje..."
                              rows={3}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Accommodation Information */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-purple-600" />
                    Información de Alojamiento
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="accommodationAddress"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Dirección de Alojamiento</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              placeholder="Dirección completa donde se hospedará el menor..."
                              rows={2}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="contactPersonAbroad"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Persona de Contacto en el Extranjero</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Nombre completo" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="contactPhoneAbroad"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teléfono de Contacto</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Incluir código de país" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Document Upload */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-orange-600" />
                    Documentos Requeridos
                  </h3>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                    <div className="space-y-2">
                      <Label htmlFor="documents" className="text-sm font-medium text-gray-700 cursor-pointer">
                        Subir Documentos
                      </Label>
                      <Input
                        id="documents"
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <p className="text-xs text-gray-500">
                        Formatos permitidos: PDF, JPG, PNG. Máximo 10MB por archivo.
                      </p>
                    </div>
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('documents')?.click()}
                      className="mt-4"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Seleccionar Archivos
                    </Button>
                  </div>
                  
                  {/* File List */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <h4 className="text-sm font-medium text-gray-700">Archivos Subidos:</h4>
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm text-gray-600">{file.name}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                          >
                            Eliminar
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-900 mb-2">Documentos Requeridos:</h4>
                    <ul className="text-xs text-blue-800 space-y-1">
                      <li>• Copia de cédula de identidad del menor</li>
                      <li>• Copia de cédula de identidad del tutor/padre/madre</li>
                      <li>• Autorización notarial de viaje (si aplica)</li>
                      <li>• Pasaporte del menor (copia)</li>
                      <li>• Certificado de nacimiento del menor</li>
                    </ul>
                  </div>
                </div>

                {/* Additional Information */}
                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Información Adicional (Opcional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Cualquier información adicional relevante para el proceso..."
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <div className="flex justify-end pt-6">
                  <Button
                    type="submit"
                    disabled={submitMutation.isPending}
                    className="min-w-[200px]"
                  >
                    {submitMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      "Enviar Solicitud"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}