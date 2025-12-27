const CreatePageSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4 p-6 border border-gray-300 rounded-lg shadow-sm bg-white">
      <div className="h-6 bg-gray-300 rounded w-1/3"></div>
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      <div className="h-10 bg-gray-300 rounded w-1/4 mt-6"></div>
    </div>
  );
}
export default CreatePageSkeleton;