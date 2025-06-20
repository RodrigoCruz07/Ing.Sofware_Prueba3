import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Shield, 
  ArrowLeft, 
  Search, 
  Filter,
  Eye,
  Download,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  FileText,
  Baby,
  Package,
  User
} from "lucide-react";
import { Link } from "wouter";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
}

export default function MyRequests() {
  // Simulated user data
  const userData: UserData = {
    firstName: "Juan",
    lastName: "Pérez",
    email: "juan.perez@gmail.com"
  };

  const requests = [
    {
      id: "REQ-2024-001",
      type: "Documentación para Menores",
      title: "Autorización de viaje - María Pérez",
      status: "En Proceso",
      submittedDate: "2024-01-15",
      lastUpdate: "2024-01-18",
      estimatedCompletion: "2024-01-25",
      description: "Documentación para viaje de menor a Argentina",
      icon: Baby,
      color: "bg-pink-100 text-pink-600"
    },
    {
      id: "REQ-2024-002", 
      type: "Formulario de Inventario",
      title: "Inventario - Importación textiles",
      status: "Aprobado",
      submittedDate: "2024-01-10",
      lastUpdate: "2024-01-14",
      estimatedCompletion: "2024-01-14",
      description: "Control de inventario para mercancía textil",
      icon: Package,
      color: "bg-orange-100 text-orange-600"
    },
    {
      id: "REQ-2024-003",
      type: "Certificado de Origen",
      title: "Certificado productos agrícolas",
      status: "Pendiente",
      submittedDate: "2024-01-12",
      lastUpdate: "2024-01-12",
      estimatedCompletion: "2024-01-20",
      description: "Certificado de origen para exportación de frutas",
      icon: FileText,
      color: "bg-green-100 text-green-600"
    },
    {
      id: "REQ-2024-004",
      type: "Declaración de Importación",
      title: "Importación equipos electrónicos",
      status: "Rechazado",
      submittedDate: "2024-01-08",
      lastUpdate: "2024-01-10",
      estimatedCompletion: "-",
      description: "Documentación incompleta - requiere información adicional",
      icon: FileText,
      color: "bg-blue-100 text-blue-600"
    }
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
      case "Pendiente": return <AlertTriangle className="h-4 w-4" />;
      case "Rechazado": return <XCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userSession');
    sessionStorage.clear();
    window.location.href = '/login';
  };

  const stats = [
    { title: "Total Solicitudes", value: requests.length.toString(), color: "text-blue-600" },
    { title: "En Proceso", value: requests.filter(r => r.status === "En Proceso").length.toString(), color: "text-yellow-600" },
    { title: "Aprobadas", value: requests.filter(r => r.status === "Aprobado").length.toString(), color: "text-green-600" },
    { title: "Pendientes", value: requests.filter(r => r.status === "Pendiente").length.toString(), color: "text-blue-600" },
  ];

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
              <h1 className="text-xl font-semibold text-gray-900">Mis Solicitudes</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/user-home">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver al Inicio
                </Button>
              </Link>
              
              {/* User Profile */}
              <div className="flex items-center space-x-3 border-l pl-4">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                <span className="text-gray-700 font-medium">
                  {userData.firstName} {userData.lastName}
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </Button>
              </div>
            </div>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Mis Solicitudes Aduaneras</h2>
          <p className="text-gray-600">Gestione y haga seguimiento a todas sus solicitudes y trámites</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm font-medium ${stat.color}`}>{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters and Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-1 items-center space-x-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Buscar solicitudes..." 
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </div>
              <Link href="/user-home">
                <Button>
                  Nueva Solicitud
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Requests List */}
        <div className="space-y-6">
          {requests.map((request) => (
            <Card key={request.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${request.color}`}>
                      <request.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
                        <Badge className={`${getStatusColor(request.status)} flex items-center space-x-1`}>
                          {getStatusIcon(request.status)}
                          <span>{request.status}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{request.description}</p>
                      <p className="text-xs text-gray-500">ID: {request.id} • Tipo: {request.type}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Detalles
                    </Button>
                    {request.status === "Aprobado" && (
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Descargar
                      </Button>
                    )}
                  </div>
                </div>

                {/* Timeline info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Fecha de Envío</p>
                      <p className="text-sm font-medium">{request.submittedDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Última Actualización</p>
                      <p className="text-sm font-medium">{request.lastUpdate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Fecha Estimada</p>
                      <p className="text-sm font-medium">{request.estimatedCompletion}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Help Section */}
        <Card className="mt-12">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">¿Necesita Ayuda?</h3>
            <p className="text-gray-600 mb-6">
              Si tiene dudas sobre el estado de sus solicitudes o necesita asistencia, no dude en contactarnos.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline">
                Contactar Soporte
              </Button>
              <Button variant="outline">
                Preguntas Frecuentes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}