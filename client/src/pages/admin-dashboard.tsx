import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Ship, 
  Users, 
  FileText, 
  TrendingUp, 
  Settings, 
  Bell, 
  LogOut,
  Search,
  Plus,
  Filter,
  MoreVertical,
  Package,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function AdminDashboard() {
  const { toast } = useToast();
  const stats = [
    { title: "Ingresos de Personas (Hoy)", value: "2,847", icon: Users, trend: "+8%" },
    { title: "Egresos de Personas (Hoy)", value: "2,756", icon: Users, trend: "+3%" },
    { title: "Vehículos Ingresados", value: "892", icon: TrendingUp, trend: "+15%" },
    { title: "Vehículos Egresados", value: "834", icon: TrendingUp, trend: "+12%" },
  ];

  const monthlyData = [
    { month: "Ene", ingresos: 65432, egresos: 62180, vehiculos_in: 18456, vehiculos_out: 17892 },
    { month: "Feb", ingresos: 71256, egresos: 68943, vehiculos_in: 19834, vehiculos_out: 19245 },
    { month: "Mar", ingresos: 68934, egresos: 70123, vehiculos_in: 20156, vehiculos_out: 20789 },
    { month: "Abr", ingresos: 73456, egresos: 69834, vehiculos_in: 21234, vehiculos_out: 20456 },
    { month: "May", ingresos: 75892, egresos: 74567, vehiculos_in: 22145, vehiculos_out: 21678 },
    { month: "Jun", ingresos: 78934, egresos: 76234, vehiculos_in: 23456, vehiculos_out: 22890 },
  ];

  const borderStats = [
    { border: "Los Andes", daily_crossings: 1456, vehicles: 234, status: "Normal" },
    { border: "Valparaíso Puerto", daily_crossings: 892, vehicles: 156, status: "Alto Tráfico" },
    { border: "Chacalluta", daily_crossings: 567, vehicles: 89, status: "Normal" },
    { border: "San Antonio Puerto", daily_crossings: 1234, vehicles: 198, status: "Normal" },
  ];

  const recentOperations = [
    { id: "DEC-001", company: "Importadora Global S.A.", status: "Aprobada", amount: "$12,500", date: "Hoy 14:30" },
    { id: "DEC-002", company: "Comercial Export Ltd.", status: "Pendiente", amount: "$8,900", date: "Hoy 12:15" },
    { id: "DEC-003", company: "Trading Solutions", status: "Revisión", amount: "$15,200", date: "Ayer 16:45" },
    { id: "DEC-004", company: "Logistics Pro", status: "Aprobada", amount: "$22,100", date: "Ayer 10:20" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aprobada": return "bg-green-100 text-green-800";
      case "Pendiente": return "bg-yellow-100 text-yellow-800";
      case "Revisión": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Aprobada": return <CheckCircle className="h-4 w-4" />;
      case "Pendiente": return <Clock className="h-4 w-4" />;
      case "Revisión": return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
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
              <h1 className="text-xl font-semibold text-gray-900">Panel de Control - Administrador</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notificaciones
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configuración
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
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 font-medium">{stat.trend}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Statistics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Traffic Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Flujo Mensual de Personas y Vehículos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">Tendencia Últimos 6 Meses</span>
                    <div className="flex space-x-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                        <span>Ingresos</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                        <span>Egresos</span>
                      </div>
                    </div>
                  </div>
                  {monthlyData.map((data, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{data.month}</span>
                        <span>Personas: {data.ingresos.toLocaleString()} / {data.egresos.toLocaleString()}</span>
                      </div>
                      <div className="flex space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{width: `${(data.ingresos / 80000) * 100}%`}}
                          ></div>
                        </div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-red-500 h-2 rounded-full" 
                            style={{width: `${(data.egresos / 80000) * 100}%`}}
                          ></div>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Vehículos: {data.vehiculos_in.toLocaleString()}</span>
                        <span>Vehículos: {data.vehiculos_out.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Border Crossings Status */}
          <Card>
            <CardHeader>
              <CardTitle>Estado de Cruces Fronterizos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {borderStats.map((border, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">{border.border}</h3>
                      <Badge className={`${border.status === 'Normal' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {border.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Cruces Diarios</p>
                        <p className="font-semibold text-lg">{border.daily_crossings.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Vehículos</p>
                        <p className="font-semibold text-lg">{border.vehicles}</p>
                      </div>
                    </div>
                    <div className="mt-3 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${border.status === 'Normal' ? 'bg-green-500' : 'bg-yellow-500'}`}
                        style={{width: `${(border.daily_crossings / 1500) * 100}%`}}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Operations */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Operaciones Recientes</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input 
                        placeholder="Buscar declaraciones..." 
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Trabajando...",
                          description: "Preparando filtros de búsqueda...",
                        });
                      }}
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Filtros
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Trabajando...",
                          description: "Abriendo formulario de nueva declaración...",
                        });
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Nueva Declaración
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOperations.map((operation) => (
                    <div key={operation.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{operation.id}</p>
                          <p className="text-sm text-gray-600">{operation.company}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{operation.amount}</p>
                          <p className="text-sm text-gray-500">{operation.date}</p>
                        </div>
                        <Badge className={`${getStatusColor(operation.status)} flex items-center space-x-1`}>
                          {getStatusIcon(operation.status)}
                          <span>{operation.status}</span>
                        </Badge>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "Trabajando...",
                              description: "Cargando opciones de la declaración...",
                            });
                          }}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Trabajando...",
                      description: "Iniciando nuevo formulario de declaración...",
                    });
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva Declaración
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Trabajando...",
                      description: "Accediendo al panel de gestión de usuarios...",
                    });
                  }}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Gestionar Usuarios
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Trabajando...",
                      description: "Generando reportes estadísticos...",
                    });
                  }}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Generar Reportes
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Trabajando...",
                      description: "Abriendo configuración del sistema...",
                    });
                  }}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Configuración Sistema
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alertas del Sistema</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                  <p className="text-sm font-medium text-yellow-800">3 declaraciones pendientes de revisión</p>
                </div>
                <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                  <p className="text-sm font-medium text-blue-800">Actualización del sistema programada</p>
                </div>
                <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded">
                  <p className="text-sm font-medium text-green-800">Backup completado exitosamente</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}