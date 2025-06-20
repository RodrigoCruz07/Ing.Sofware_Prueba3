import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, 
  ArrowLeft, 
  Search, 
  Package, 
  MapPin, 
  Truck,
  Calendar,
  CheckCircle,
  Loader2,
  Plus,
  Minus,
  AlertTriangle
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

const inventoryItemSchema = z.object({
  description: z.string().min(5, "La descripción debe tener al menos 5 caracteres"),
  quantity: z.number().min(1, "La cantidad debe ser mayor a 0"),
  unit: z.string().min(1, "La unidad es requerida"),
  weight: z.number().min(0.1, "El peso debe ser mayor a 0"),
  value: z.number().min(1, "El valor debe ser mayor a 0"),
  originCountry: z.string().min(1, "El país de origen es requerido"),
  hsCode: z.string().optional(),
});

const inventoryFormSchema = z.object({
  // Company Information
  companyName: z.string().min(2, "El nombre de la empresa debe tener al menos 2 caracteres"),
  companyRut: z.string().min(8, "El RUT de la empresa debe tener al menos 8 caracteres"),
  responsiblePerson: z.string().min(2, "El nombre del responsable debe tener al menos 2 caracteres"),
  contactEmail: z.string().email("Debe ingresar un email válido"),
  contactPhone: z.string().min(8, "El teléfono debe tener al menos 8 dígitos"),
  
  // Shipment Information
  shipmentType: z.string().min(1, "El tipo de envío es requerido"),
  transportMode: z.string().min(1, "El modo de transporte es requerido"),
  originPort: z.string().min(1, "El puerto de origen es requerido"),
  destinationPort: z.string().min(1, "El puerto de destino es requerido"),
  estimatedArrival: z.string().min(1, "La fecha estimada de llegada es requerida"),
  
  // Container/Vehicle Information
  containerNumber: z.string().optional(),
  sealNumber: z.string().optional(),
  vehiclePlate: z.string().optional(),
  driverName: z.string().optional(),
  driverLicense: z.string().optional(),
  
  // Items (will be handled separately)
  items: z.array(inventoryItemSchema).min(1, "Debe agregar al menos un item"),
  
  // Additional Information
  specialHandling: z.string().optional(),
  observations: z.string().optional(),
  riskAssessment: z.string().min(1, "La evaluación de riesgo es requerida"),
});

type InventoryFormData = z.infer<typeof inventoryFormSchema>;
type InventoryItem = z.infer<typeof inventoryItemSchema>;

export default function InventoryForm() {
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [currentItem, setCurrentItem] = useState<Partial<InventoryItem>>({});
  const { toast } = useToast();

  const form = useForm<InventoryFormData>({
    resolver: zodResolver(inventoryFormSchema),
    defaultValues: {
      companyName: "",
      companyRut: "",
      responsiblePerson: "",
      contactEmail: "",
      contactPhone: "",
      shipmentType: "",
      transportMode: "",
      originPort: "",
      destinationPort: "",
      estimatedArrival: "",
      containerNumber: "",
      sealNumber: "",
      vehiclePlate: "",
      driverName: "",
      driverLicense: "",
      items: [],
      specialHandling: "",
      observations: "",
      riskAssessment: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: InventoryFormData) => {
      const response = await apiRequest("POST", "/api/procedures/inventory-form", {
        ...data,
        items: items,
      });
      return response.json();
    },
    onSuccess: (data) => {
      setSubmitSuccess("Formulario de inventario enviado exitosamente. Número de referencia: " + data.referenceNumber);
      
      toast({
        title: "Formulario enviado",
        description: "Su formulario de inventario ha sido procesado correctamente",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error al enviar formulario",
        description: "Ha ocurrido un error. Intente nuevamente.",
        variant: "destructive",
      });
    },
  });

  const addItem = () => {
    if (currentItem.description && currentItem.quantity && currentItem.unit && currentItem.weight && currentItem.value && currentItem.originCountry) {
      setItems([...items, currentItem as InventoryItem]);
      setCurrentItem({});
    } else {
      toast({
        title: "Item incompleto",
        description: "Complete todos los campos requeridos del item",
        variant: "destructive",
      });
    }
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const onSubmit = (data: InventoryFormData) => {
    if (items.length === 0) {
      toast({
        title: "Sin items",
        description: "Debe agregar al menos un item al inventario",
        variant: "destructive",
      });
      return;
    }
    
    submitMutation.mutate({ ...data, items });
  };

  const calculateTotalValue = () => {
    return items.reduce((total, item) => total + (item.value * item.quantity), 0);
  };

  const calculateTotalWeight = () => {
    return items.reduce((total, item) => total + (item.weight * item.quantity), 0);
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
              <h1 className="text-xl font-semibold text-gray-900">Formulario de Inventario - Control de Contrabando</h1>
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Search className="text-orange-600 w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Formulario de Inventario para Control de Contrabando
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Complete este formulario detalladamente para optimizar el control aduanero y prevenir el contrabando
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    
                    {/* Company Information */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Package className="h-5 w-5 mr-2 text-blue-600" />
                        Información de la Empresa
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="companyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nombre de la Empresa</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Empresa Importadora S.A." />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="companyRut"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>RUT de la Empresa</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="12.345.678-9" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="responsiblePerson"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Persona Responsable</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Juan Pérez González" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="contactEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email de Contacto</FormLabel>
                              <FormControl>
                                <Input {...field} type="email" placeholder="contacto@empresa.com" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="contactPhone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Teléfono de Contacto</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="+56 2 1234 5678" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Shipment Information */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Truck className="h-5 w-5 mr-2 text-green-600" />
                        Información del Envío
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="shipmentType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tipo de Envío</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Seleccione tipo" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="import">Importación</SelectItem>
                                  <SelectItem value="export">Exportación</SelectItem>
                                  <SelectItem value="transit">Tránsito</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="transportMode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Modo de Transporte</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Seleccione modo" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="maritime">Marítimo</SelectItem>
                                  <SelectItem value="air">Aéreo</SelectItem>
                                  <SelectItem value="land">Terrestre</SelectItem>
                                  <SelectItem value="rail">Ferroviario</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="originPort"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Puerto/Punto de Origen</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Puerto de Buenos Aires" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="destinationPort"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Puerto/Punto de Destino</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Puerto de Valparaíso" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="estimatedArrival"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Fecha Estimada de Llegada</FormLabel>
                              <FormControl>
                                <Input {...field} type="datetime-local" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Container/Vehicle Information */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <MapPin className="h-5 w-5 mr-2 text-purple-600" />
                        Información del Contenedor/Vehículo
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="containerNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Número de Contenedor (Opcional)</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="ABCD1234567" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="sealNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Número de Sello (Opcional)</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="123456789" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="vehiclePlate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Patente del Vehículo (Opcional)</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="AA-BB-12" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="driverName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nombre del Conductor (Opcional)</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Juan Conductor" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="driverLicense"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Licencia del Conductor (Opcional)</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="12345678" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Risk Assessment */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                        Evaluación de Riesgo
                      </h3>
                      <FormField
                        control={form.control}
                        name="riskAssessment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nivel de Riesgo Estimado</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Seleccione nivel de riesgo" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="low">Bajo - Mercancía común, ruta estándar</SelectItem>
                                <SelectItem value="medium">Medio - Requiere inspección adicional</SelectItem>
                                <SelectItem value="high">Alto - Inspección exhaustiva requerida</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Additional Information */}
                    <div className="grid grid-cols-1 gap-6">
                      <FormField
                        control={form.control}
                        name="specialHandling"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Manejo Especial Requerido (Opcional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                {...field} 
                                placeholder="Describa cualquier requerimiento especial de manejo..."
                                rows={3}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="observations"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Observaciones Adicionales (Opcional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                {...field} 
                                placeholder="Cualquier observación adicional relevante..."
                                rows={3}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-6">
                      <Button
                        type="submit"
                        disabled={submitMutation.isPending || items.length === 0}
                        className="min-w-[200px]"
                      >
                        {submitMutation.isPending ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          "Enviar Formulario"
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Item Management */}
          <div className="space-y-6">
            {/* Add Item Form */}
            <Card>
              <CardHeader>
                <CardTitle>Agregar Item al Inventario</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="itemDescription">Descripción</Label>
                  <Input
                    id="itemDescription"
                    value={currentItem.description || ""}
                    onChange={(e) => setCurrentItem({...currentItem, description: e.target.value})}
                    placeholder="Descripción del producto"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="itemQuantity">Cantidad</Label>
                    <Input
                      id="itemQuantity"
                      type="number"
                      value={currentItem.quantity || ""}
                      onChange={(e) => setCurrentItem({...currentItem, quantity: parseFloat(e.target.value)})}
                      placeholder="100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="itemUnit">Unidad</Label>
                    <Select onValueChange={(value) => setCurrentItem({...currentItem, unit: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Unidad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kilogramos</SelectItem>
                        <SelectItem value="ton">Toneladas</SelectItem>
                        <SelectItem value="units">Unidades</SelectItem>
                        <SelectItem value="boxes">Cajas</SelectItem>
                        <SelectItem value="pallets">Pallets</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="itemWeight">Peso (kg)</Label>
                    <Input
                      id="itemWeight"
                      type="number"
                      step="0.1"
                      value={currentItem.weight || ""}
                      onChange={(e) => setCurrentItem({...currentItem, weight: parseFloat(e.target.value)})}
                      placeholder="50.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="itemValue">Valor (USD)</Label>
                    <Input
                      id="itemValue"
                      type="number"
                      value={currentItem.value || ""}
                      onChange={(e) => setCurrentItem({...currentItem, value: parseFloat(e.target.value)})}
                      placeholder="1000"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="itemOrigin">País de Origen</Label>
                  <Input
                    id="itemOrigin"
                    value={currentItem.originCountry || ""}
                    onChange={(e) => setCurrentItem({...currentItem, originCountry: e.target.value})}
                    placeholder="Argentina"
                  />
                </div>
                
                <div>
                  <Label htmlFor="itemHS">Código HS (Opcional)</Label>
                  <Input
                    id="itemHS"
                    value={currentItem.hsCode || ""}
                    onChange={(e) => setCurrentItem({...currentItem, hsCode: e.target.value})}
                    placeholder="0123.45.67"
                  />
                </div>
                
                <Button onClick={addItem} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Item
                </Button>
              </CardContent>
            </Card>

            {/* Items List */}
            <Card>
              <CardHeader>
                <CardTitle>Items Agregados ({items.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {items.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No hay items agregados</p>
                ) : (
                  <div className="space-y-3">
                    {items.map((item, index) => (
                      <div key={index} className="border rounded p-3">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-sm">{item.description}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(index)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-xs text-gray-600 space-y-1">
                          <p>Cantidad: {item.quantity} {item.unit}</p>
                          <p>Peso: {item.weight} kg</p>
                          <p>Valor: ${item.value} USD</p>
                          <p>Origen: {item.originCountry}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Summary */}
            {items.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Resumen</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Items:</span>
                      <span>{items.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Peso Total:</span>
                      <span>{calculateTotalWeight().toFixed(2)} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Valor Total:</span>
                      <span>${calculateTotalValue().toLocaleString()} USD</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}