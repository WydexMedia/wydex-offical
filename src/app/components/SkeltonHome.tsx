// components/SkeletonHome.tsx
export default function SkeletonHome() {
    return (
      <div className="p-8 animate-pulse space-y-6">
        <div className="h-10 w-40 bg-gray-300 rounded-full" />
        <div className="h-96 w-full bg-gray-200 rounded-lg" />
        <div className="space-y-3">
          <div className="h-6 w-3/4 bg-gray-300 rounded" />
          <div className="h-6 w-1/2 bg-gray-300 rounded" />
          <div className="h-6 w-full bg-gray-300 rounded" />
        </div>
      </div>
    );
  }
  