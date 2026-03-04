import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Bell, 
  Activity, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Calendar,
  Pill,
  MessageSquare,
  TrendingUp,
  ChevronRight,
  X,
  ChevronDown,
  ChevronUp,
  User,
  Heart,
  Droplet,
  Thermometer,
  Star,
  Info
} from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SidePanel = ({ isOpen, onClose }: SidePanelProps) => {
  const { medications, appointments, leftHandMode, navigate } = useApp();
  const [expandedPanel, setExpandedPanel] = useState<string>('activity');

  if (!isOpen) return null;

  const togglePanel = (panelId: string) => {
    setExpandedPanel(expandedPanel === panelId ? '' : panelId);
  };

  // Get recent activity
  const recentActivity = [
    { id: '1', type: 'medication', title: 'Lisinopril taken', time: '2 hours ago', icon: CheckCircle2, color: 'text-green-600' },
    { id: '2', type: 'appointment', title: 'Appointment scheduled', time: '5 hours ago', icon: Calendar, color: 'text-blue-600' },
    { id: '3', type: 'message', title: 'Message from Dr. Smith', time: 'Yesterday', icon: MessageSquare, color: 'text-purple-600' },
    { id: '4', type: 'medication', title: 'Metformin taken', time: 'Yesterday', icon: CheckCircle2, color: 'text-green-600' },
  ];

  // Get upcoming tasks
  const upcomingTasks = [
    { id: '1', title: 'Take Metformin', time: 'In 3 hours', priority: 'high', icon: Pill },
    { id: '2', title: 'Dr. Smith Follow-up', time: 'Tomorrow, 2:00 PM', priority: 'medium', icon: Calendar },
    { id: '3', title: 'Refill Lisinopril', time: 'In 3 days', priority: 'low', icon: AlertCircle },
  ];

  // Health metrics
  const healthMetrics = [
    { id: '1', label: 'Heart Rate', value: '72 bpm', icon: Heart, trend: 'stable' },
    { id: '2', label: 'Blood Pressure', value: '120/80', icon: Activity, trend: 'up' },
    { id: '3', label: 'Blood Glucose', value: '95 mg/dL', icon: Droplet, trend: 'down' },
    { id: '4', label: 'Temperature', value: '98.6°F', icon: Thermometer, trend: 'stable' },
  ];

  // Quick info
  const quickInfo = [
    { id: '1', label: 'Active Medications', value: medications.length.toString(), color: 'bg-blue-50 text-blue-600' },
    { id: '2', label: 'Upcoming Appointments', value: appointments.length.toString(), color: 'bg-purple-50 text-purple-600' },
    { id: '3', label: 'Refills Due', value: '2', color: 'bg-orange-50 text-orange-600' },
    { id: '4', label: 'Adherence Rate', value: '94%', color: 'bg-green-50 text-green-600' },
  ];

  const PanelSection = ({ 
    id, 
    title, 
    icon: Icon, 
    badge, 
    children 
  }: { 
    id: string; 
    title: string; 
    icon: any; 
    badge?: number; 
    children: React.ReactNode;
  }) => {
    const isExpanded = expandedPanel === id;
    
    return (
      <div className="border-b border-gray-200">
        <button
          onClick={() => togglePanel(id)}
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-gray-600" />
            <span className="font-medium text-sm text-gray-900">{title}</span>
            {badge !== undefined && badge > 0 && (
              <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                {badge}
              </Badge>
            )}
          </div>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </button>
        {isExpanded && (
          <div className="px-4 py-3 bg-gray-50">
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <div 
      className={`w-80 bg-white flex flex-col h-full ${
        leftHandMode ? 'border-r' : 'border-l'
      } border-gray-200`}
    >
      {/* Header */}
      <div className="h-14 border-b border-gray-200 flex items-center justify-between px-4">
        <h2 className="font-semibold text-gray-900">Side Panel</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0"
          title="Close Panel (Ctrl+B)"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        {/* Quick Info Cards */}
        <div className="p-4 space-y-2">
          {quickInfo.map((info) => (
            <div
              key={info.id}
              className={`${info.color} rounded-lg px-3 py-2 flex items-center justify-between`}
            >
              <span className="text-sm font-medium">{info.label}</span>
              <span className="text-lg font-bold">{info.value}</span>
            </div>
          ))}
        </div>

        <Separator />

        {/* Activity Panel */}
        <PanelSection id="activity" title="Recent Activity" icon={Activity} badge={recentActivity.length}>
          <div className="space-y-3">
            {recentActivity.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`${activity.color} mt-0.5`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              );
            })}
            <Button variant="ghost" size="sm" className="w-full text-xs">
              View All Activity
              <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </PanelSection>

        {/* Upcoming Tasks */}
        <PanelSection id="tasks" title="Upcoming" icon={Clock} badge={upcomingTasks.length}>
          <div className="space-y-2">
            {upcomingTasks.map((task) => {
              const Icon = task.icon;
              return (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-white transition-colors cursor-pointer"
                >
                  <Icon className="w-4 h-4 text-gray-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {task.title}
                    </p>
                    <p className="text-xs text-gray-500">{task.time}</p>
                  </div>
                  <Badge
                    variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}
                    className="text-xs px-2"
                  >
                    {task.priority}
                  </Badge>
                </div>
              );
            })}
          </div>
        </PanelSection>

        {/* Health Metrics */}
        <PanelSection id="health" title="Health Metrics" icon={TrendingUp}>
          <div className="space-y-3">
            {healthMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.id}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-white transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">{metric.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">
                      {metric.value}
                    </span>
                    {metric.trend === 'up' && (
                      <TrendingUp className="w-3 h-3 text-green-600" />
                    )}
                    {metric.trend === 'down' && (
                      <TrendingUp className="w-3 h-3 text-red-600 rotate-180" />
                    )}
                  </div>
                </div>
              );
            })}
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-xs"
              onClick={() => navigate('/settings')}
            >
              Configure Metrics
            </Button>
          </div>
        </PanelSection>

        {/* Notifications */}
        <PanelSection id="notifications" title="Notifications" icon={Bell} badge={3}>
          <div className="space-y-2">
            <div className="flex items-start gap-2 p-2 rounded-md bg-blue-50">
              <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-blue-900">
                  Medication Reminder
                </p>
                <p className="text-xs text-blue-700 mt-0.5">
                  Time to take your evening medication
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-2 rounded-md bg-purple-50">
              <Calendar className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-purple-900">
                  Appointment Tomorrow
                </p>
                <p className="text-xs text-purple-700 mt-0.5">
                  Dr. Smith at 2:00 PM
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-2 rounded-md bg-orange-50">
              <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-orange-900">
                  Refill Needed
                </p>
                <p className="text-xs text-orange-700 mt-0.5">
                  Lisinopril - 2 refills remaining
                </p>
              </div>
            </div>
          </div>
        </PanelSection>

        {/* Favorites */}
        <PanelSection id="favorites" title="Quick Actions" icon={Star}>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-xs"
              onClick={() => navigate('/medications/add')}
            >
              <Pill className="w-3 h-3 mr-2" />
              Add Medication
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-xs"
              onClick={() => navigate('/calendar')}
            >
              <Calendar className="w-3 h-3 mr-2" />
              Schedule Appointment
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-xs"
              onClick={() => navigate('/communications')}
            >
              <MessageSquare className="w-3 h-3 mr-2" />
              Send Message
            </Button>
          </div>
        </PanelSection>
      </ScrollArea>
    </div>
  );
};
