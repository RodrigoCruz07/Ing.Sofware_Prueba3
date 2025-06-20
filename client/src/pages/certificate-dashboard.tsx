import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Award, 
  Download, 
  Eye, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  LogOut,
  Bell,
  Search,
  Upload,
  Filter,
  Ship,
  Calendar,
  DollarSign
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function CertificateDashboard() {
  const certificates = [
    { 
      id: "CERT-2024-001", 
      type: "Certificado de Origen", 
      status: "Aprobado", 
      date: "2024-01-15", 
      expiryDate: "2024-07-15",
      product: "Textiles de Algodón",
      country: "México"
    },
    { 
      id: "CERT-2024-002", 
      type: "Certificado Fitosanitario", 
      status: "En Proceso", 
      date: "2024-01-10", 
      expiryDate: "2024-06-10",
      product: "Frutas Frescas",
      country: "Chile"
    },
    { 
      id: "CERT-2024-003", 
      type: "Certificado de Calidad", 
      status: "Pendiente", 
      date: "2024-01-08", 
      expiryDate: "2024-05-08",
      product: "Productos Químicos",
      country: "Brasil"
    },
    { 
      id: "CERT-2024-004", 
      type: "Certificado de Origen", 
      status: "Aprobado", 
      date: "2024-01-05", 
      expiryDate: "2024-08-05",
      product: "Equipos Electrónicos",
      country: "China"
    },
  ];

  const stats = [
    { title: "Certificados Activos", value: "24", icon: Award, color: "text-green-600" },
    { title: "En Proceso", value: "8", icon: Clock, color: "text-yellow-600" },
    { title: "Próximos a Vencer", value: "3", icon: AlertCircle, color: "text-red-600" },
    { title: "Este Mes", value: "12", icon: Calendar, color: "text-blue-600" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aprobado": return "bg-green-100 text-green-800 border-green-200";
      case "En Proceso": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Pendiente": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Rechazado": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Aprobado": return <CheckCircle className="h-4 w-4" />;
      case "En Proceso": return <Clock className="h-4 w-4" />;
      case "Pendiente": return <AlertCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                <Ship className="text-white w-5 h-5" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Panel de Certificados</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notificaciones
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  // Clear any stored session data
                  localStorage.removeItem('userSession');
                  sessionStorage.clear();
                  // Redirect to login
                  window.location.href = '/login';
                }}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Bienvenido a su Portal de Certificados</h2>
          <p className="text-gray-600">Gestione sus certificados aduaneros de manera fácil y segura</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Certificates List */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Mis Certificados</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input 
                        placeholder="Buscar certificados..." 
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filtros
                    </Button>
                    <Button size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Solicitar Certificado
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Award className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{cert.id}</h3>
                            <p className="text-sm text-gray-600">{cert.type}</p>
                          </div>
                        </div>
                        <Badge className={`${getStatusColor(cert.status)} flex items-center space-x-1`}>
                          {getStatusIcon(cert.status)}
                          <span>{cert.status}</span>
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                        <div>
                          <p className="text-gray-500">Producto</p>
                          <p className="font-medium">{cert.product}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">País</p>
                          <p className="font-medium">{cert.country}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Fecha Emisión</p>
                          <p className="font-medium">{cert.date}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Vencimiento</p>
                          <p className="font-medium">{cert.expiryDate}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Detalles
                        </Button>
                        {cert.status === "Aprobado" && (
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Descargar PDF
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Solicitar Certificado
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Ver Historial
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Descargar Todo
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Estado de Pagos
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Próximos Vencimientos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-red-50 border-l-4 border-red-400 rounded">
                  <p className="text-sm font-medium text-red-800">CERT-2024-003</p>
                  <p className="text-xs text-red-600">Vence en 15 días</p>
                </div>
                <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                  <p className="text-sm font-medium text-yellow-800">CERT-2024-002</p>
                  <p className="text-xs text-yellow-600">Vence en 2 meses</p>
                </div>
                <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                  <p className="text-sm font-medium text-blue-800">CERT-2024-001</p>
                  <p className="text-xs text-blue-600">Vence en 4 meses</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Información Importante</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="p-3 bg-blue-50 rounded">
                  <p className="font-medium text-blue-900">Horario de Atención</p>
                  <p className="text-blue-700">Lunes a Viernes: 8:00 - 18:00</p>
                  <p className="text-blue-700">Sábados: 9:00 - 13:00</p>
                </div>
                <div className="p-3 bg-green-50 rounded">
                  <p className="font-medium text-green-900">Soporte Técnico</p>
                  <p className="text-green-700">soporte@aduana.com</p>
                  <p className="text-green-700">+1 (555) 123-4567</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}