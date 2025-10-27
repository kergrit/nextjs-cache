// ApiCard component for displaying API data
import { ApiResponse } from '@/types/api';

interface ApiCardProps {
  result: PromiseSettledResult<ApiResponse<any>>;
  index: number;
}

export default function ApiCard({ result, index }: ApiCardProps) {
  if (result.status === 'rejected') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 h-96 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-red-800">API Error</h3>
          <span className="text-sm text-red-600">#{index + 1}</span>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="text-red-700 mb-4">
            <p className="font-medium">Failed to fetch data</p>
            <p className="text-sm mt-1">{result.reason?.message || 'Unknown error'}</p>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-red-700 mb-2">Error Details:</label>
            <textarea
              className="w-full h-32 p-3 border border-red-300 rounded-md bg-white text-sm font-mono text-red-600 resize-none"
              value={JSON.stringify(result.reason, null, 2)}
              readOnly
            />
          </div>
        </div>
        <div className="mt-4 text-sm text-red-500">
          <span>Error occurred at {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    );
  }

  const { data, source, loadTime, cached, timestamp } = result.value;

  const getCardColor = () => {
    if (cached) {
      return 'bg-green-50 border-green-200';
    }
    return 'bg-blue-50 border-blue-200';
  };

  const getStatusBadge = () => {
    if (cached) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          ⚡ CACHE HIT
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        🔄 LIVE FETCH
      </span>
    );
  };

  const getTextareaColor = () => {
    if (cached) {
      return 'border-green-300 bg-white text-green-700';
    }
    return 'border-blue-300 bg-white text-blue-700';
  };

  return (
    <div className={`border rounded-lg p-6 h-96 flex flex-col ${getCardColor()}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{source}</h3>
        <div className="flex items-center space-x-2">
          {getStatusBadge()}
          <span className="text-sm text-gray-500">#{index + 1}</span>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col">
        <label className="block text-sm font-medium text-gray-700 mb-2">JSON Response:</label>
        <textarea
          className={`w-full flex-1 p-3 border rounded-md text-sm font-mono resize-none ${getTextareaColor()}`}
          value={JSON.stringify(data, null, 2)}
          readOnly
        />
      </div>
      
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <span className={`font-bold ${cached ? 'text-green-600' : 'text-orange-600'}`}>
            Load time: {loadTime}ms
          </span>
          <span>•</span>
          <span>{new Date(timestamp).toLocaleTimeString()}</span>
        </div>
        <div className={`text-xs font-medium ${cached ? 'text-green-600' : 'text-orange-600'}`}>
          {cached ? '⚡ From cache' : '🔄 From API'}
        </div>
      </div>
    </div>
  );
}
