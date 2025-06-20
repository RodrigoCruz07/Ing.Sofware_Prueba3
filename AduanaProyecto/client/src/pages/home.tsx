import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, 
  LogIn, 
  FileText, 
  Truck, 
  Package, 
  Clock, 
  MapPin,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Users,
  DollarSign,
  Scale
} from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { toast } = useToast();
  const news = [
    {
      id: 1,
      title: "Aduana de Valparaíso incauta 2.5 toneladas de cocaína en contenedor procedente de Colombia",
      summary: "La operación coordinada entre Aduana, PDI y Fiscalía permitió el decomiso de droga oculta en cargamento de frutas.",
      date: "Hace 2 horas",
      type: "Incautación",
      urgent: true
    },
    {
      id: 2,
      title: "Argentina actualiza requisitos fitosanitarios para exportación de carne chilena",
      summary: "SENASA modifica protocolos de certificación para productos cárnicos procedentes de Chile, entrando en vigor el próximo mes.",
      date: "Hace 4 horas",
      type: "Internacional",
      urgent: false
    },
    {
      id: 3,
      title: "Nuevo sistema digitalizado reduce tiempos de despacho en un 40% en Puerto San Antonio",
      summary: "La implementación de tecnología blockchain mejora la trazabilidad y acelera los procesos aduaneros.",
      date: "Hace 6 horas",
      type: "Modernización",
      urgent: false
    },
    {
      id: 4,
      title: "Perú establece nuevas tarifas arancelarias para productos textiles chilenos",
      summary: "SUNAT anuncia modificaciones en la clasificación arancelaria que afectarán las exportaciones del sector textil nacional.",
      date: "Hace 12 horas",
      type: "Internacional",
      urgent: false
    },
    {
      id: 5,
      title: "Decomisan cigarrillos de contrabando valorados en $800 millones en frontera norte",
      summary: "Operativo conjunto detecta mercadería ilegal transportada en vehículos particulares desde Bolivia.",
      date: "Hace 1 día",
      type: "Operativo",
      urgent: false
    },
    {
      id: 6,
      title: "Chile firma acuerdo de facilitación comercial con países del Pacífico",
      summary: "Nueva alianza reducirá aranceles y simplificará trámites para exportadores nacionales.",
      date: "Hace 2 días",
      type: "Acuerdo",
      urgent: false
    }
  ];

  const procedures = [
    {
      title: "Declaración de Importación",
      description: "Registre sus importaciones y calcule aranceles automáticamente",
      icon: Package,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Certificado de Origen",
      description: "Solicite certificados para productos de exportación",
      icon: FileText,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Despacho Urgente",
      description: "Tramite despachos prioritarios para mercancía sensible",
      icon: Clock,
      color: "bg-red-100 text-red-600"
    },
    {
      title: "Registro de Exportador",
      description: "Obtenga su registro oficial para exportar productos",
      icon: Users,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Valoración Aduanera",
      description: "Determine el valor correcto de sus mercancías",
      icon: DollarSign,
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      title: "Consulta Arancelaria",
      description: "Verifique la clasificación y aranceles aplicables",
      icon: Scale,
      color: "bg-indigo-100 text-indigo-600"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center mr-3 shadow-lg">
                <Shield className="text-white w-7 h-7" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SERVICIO NACIONAL DE ADUANAS</h1>
                <p className="text-xs text-gray-600">República de Chile</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-6">
              <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Dónde Operamos
              </button>
              <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Solicitudes
              </button>
              <Link href="/login">
                <Button className="bg-blue-900 hover:bg-blue-800 text-white">
                  <LogIn className="h-4 w-4 mr-2" />
                  Iniciar Sesión
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Chilean Flag Banner */}
      <div className="w-full h-16 relative overflow-hidden">
        <div className="absolute inset-0 flex">
          <div className="w-1/3 bg-blue-600"></div>
          <div className="w-1/3 bg-white flex items-center justify-center">
            <div className="text-blue-600 text-2xl">★</div>
          </div>
          <div className="w-1/3 bg-red-600"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Portal de Servicios Aduaneros
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Facilitamos el comercio exterior de Chile con servicios digitales seguros y eficientes
          </p>
        </div>

        {/* Main Content Grid - Procedures First, News Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Procedures Section - Main Content (3/4 width) */}
          <section className="lg:col-span-3">
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Trámites Disponibles</h3>
              <p className="text-gray-600 text-lg max-w-3xl">
                Realice sus trámites aduaneros de forma digital las 24 horas del día
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {procedures.map((procedure, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${procedure.color} group-hover:scale-110 transition-transform`}>
                        <procedure.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">{procedure.title}</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{procedure.description}</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => {
                          toast({
                            title: "En proceso...",
                            description: "Preparando el sistema de autenticación...",
                          });
                        }}
                      >
                        Iniciar Trámite
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* News Section - Sidebar (1/4 width) */}
          <section className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Noticias</h3>
              </div>
              
              <div className="space-y-4">
                {news.slice(0, 4).map((item) => (
                  <div key={item.id} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                    <div className="mb-2">
                      {item.urgent && (
                        <Badge className="bg-red-100 text-red-800 border-red-200 mb-2">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Urgente
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">{item.type}</Badge>
                    </div>
                    <h4 className="font-medium text-gray-900 text-sm mb-2 line-clamp-3 leading-tight">{item.title}</h4>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.summary}</p>
                    <span className="text-xs text-gray-500">{item.date}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  Ver todas las noticias
                </Button>
              </div>
            </div>
          </section>
        </div>

        {/* Contact Info */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Oficinas Principales</h4>
              <p className="text-sm text-gray-600">Valparaíso, Santiago, Antofagasta</p>
            </div>
            <div>
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Horario de Atención</h4>
              <p className="text-sm text-gray-600">Lunes a Viernes: 8:00 - 18:00</p>
            </div>
            <div>
              <CheckCircle className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Servicio Digital</h4>
              <p className="text-sm text-gray-600">Disponible 24/7</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm text-gray-400">
              © 2024 Servicio Nacional de Aduanas - República de Chile. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}