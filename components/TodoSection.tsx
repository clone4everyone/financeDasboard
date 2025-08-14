"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useDashboard } from '@/contexts/DashboardContext';
import toast from 'react-hot-toast';

export function TodoSection() {
  const { state, dispatch } = useDashboard();

  const handleWish = (id: string) => {
    dispatch({ type: 'WISH_TODO', id });
    toast.success('Birthday wish sent successfully! 🎉', {
      duration: 3000,
      position: 'top-right',
    });
  };

  const handleRemind = (id: string) => {
    dispatch({ type: 'REMIND_TODO', id });
    toast.success('Reminder set successfully! 📝');
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'birthday':
        return <Calendar className="h-4 w-4" />;
      case 'transaction':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'birthday':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'transaction':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          To-Do's
          <Badge variant="destructive" className="h-5 w-5 p-0 text-xs rounded-full">
            {state.todos.filter(todo => !todo.isReminded && !todo.isWished).length}
          </Badge>
        </CardTitle>
        <Button variant="outline" size="sm" className="text-xs">
          View All
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {state.todos.map((todo) => (
          <div
            key={todo.id}
            className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
              todo.isReminded ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 
              'bg-white dark:bg-card border-border'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  {getIcon(todo.type)}
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getTypeColor(todo.type)}`}>
                    {todo.title}
                  </span>
                  {todo.isReminded && (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {todo.description}
                </p>
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0">
                {todo.type === 'birthday' && !todo.isWished && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleWish(todo.id)}
                    className="text-xs h-7 px-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
                  >
                    Wish Now
                  </Button>
                )}
                {!todo.isReminded && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRemind(todo.id)}
                    className="text-xs h-7 px-2"
                  >
                    Remind
                  </Button>
                )}
                {todo.isReminded && (
                  <Badge variant="secondary" className="text-xs">
                    Reminded
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}