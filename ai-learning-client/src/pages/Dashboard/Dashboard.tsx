import { useEffect, useState } from "react";
import {FileText,BookOpen,ClipboardList,Clock3,} from "lucide-react";
import {useAppDispatch,useAppSelector,} from "../../features/hooks/reduxHooks";
import { getDashboard } from "../../features/dashboard/dashboardThunk";
import Spinner from "../../components/shared/Spinner";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { dashboard, loading, error } = useAppSelector((state) => state.dashboard);
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!dashboard) {
      dispatch(getDashboard());
    }
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-600">
          {error}
        </div>
      </div>
    );
  }

  if (!dashboard) return null;

  const { overview, recentActivity } = dashboard;

  const combinedActivity = [
  ...recentActivity.documents.map((doc) => ({
    type: "document" as const,
    id: doc._id,
    title: doc.title,
    date: doc.lastAccessed,
  })),
  ...recentActivity.quizzes.map((quiz) => ({
    type: "quiz" as const,
    id: quiz._id,
    title: quiz.title,
    date: quiz.completedAt,
  })),
].sort((a, b) => {
  const dateA = a.date ? new Date(a.date).getTime() : 0;
  const dateB = b.date ? new Date(b.date).getTime() : 0;

  return dateB - dateA;
});

  const visibleActivity = showAll ? combinedActivity : combinedActivity.slice(0, 4);

  return (
    <div className="p-6">
      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">
          Dashboard
        </h2>
        <p className="mt-2 text-slate-500">
          Track your learning progress and activity
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {/* Documents */}
        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition cursor-pointer">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">
                Documents
              </p>
              <h3 className="mt-4 text-4xl font-bold">
                {overview.totalDocuments}
              </h3>
            </div>
            <div className="h-12 w-12 rounded-xl bg-blue-500 flex items-center justify-center text-white">
              <FileText size={20} />
            </div>
          </div>
        </div>

        {/* Flashcards */}
        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition cursor-pointer">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">
                Flashcards
              </p>
              <h3 className="mt-4 text-4xl font-bold">
                {overview.totalFlashCards}
              </h3>
            </div>
            <div className="h-12 w-12 rounded-xl bg-pink-500 flex items-center justify-center text-white">
              <BookOpen size={20} />
            </div>
          </div>
        </div>

        {/* Quizzes */}
        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition cursor-pointer">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">
                Total Quizzes
              </p>
              <h3 className="mt-4 text-4xl font-bold">
                {overview.totalQuizzes}
              </h3>
            </div>
            <div className="h-12 w-12 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
              <ClipboardList size={20} />
            </div>
          </div>
        </div>

        {/* Completed Quizzes */}
        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm cursor-pointer">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">
                Completed Quizzes
              </p>
              <h3 className="mt-4 text-4xl font-bold text-emerald-600">
                {overview.completedQuizzes}
              </h3>
            </div>
            <div className="h-12 w-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <ClipboardList size={20} />
            </div>
          </div>
        </div>

        {/* Reviewed Flashcards */}
        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm cursor-pointer">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">
                Reviewed Cards
              </p>
              <h3 className="mt-4 text-4xl font-bold text-violet-600">
                {overview.reviewedFlashCards}
              </h3>
            </div>
            <div className="h-12 w-12 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600">
              <BookOpen size={20} />
            </div>
          </div>
        </div>

        {/* Average Score */}
        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm cursor-pointer">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">
                Average Score
              </p>
              <h3 className="mt-4 text-4xl font-bold text-amber-600">
                {overview.averageScore}%
              </h3>
            </div>
            <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
              <Clock3 size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center">
              <Clock3 size={18} className="text-slate-600" />
            </div>
            <h3 className="text-xl font-semibold">
              Recent Activity
            </h3>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {visibleActivity.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-2xl border border-slate-200 p-4"
            >
              <div className="flex gap-3">
                <div
                  className={`mt-2 h-2 w-2 rounded-full ${
                    item.type === "document"
                      ? "bg-sky-500"
                      : "bg-emerald-500"
                  }`}
                />

                <div>
                  <p className="font-medium">
                    {item.type === "document"
                      ? "Accessed Document:"
                      : "Attempted Quiz:"}{" "}
                    {item.title}
                  </p>

                  <p className="text-sm text-slate-500">
                    {item.date
                      ? new Date(item.date).toLocaleString()
                      : "Not Completed"}
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  navigate(
                    item.type === "document"
                      ? `/documents/${item.id}`
                      : `/quizzes/${item.id}`
                  )
                }
                className="text-emerald-600 font-medium hover:text-emerald-700 cursor-pointer"
              >
                View
              </button>
            </div>
          ))}
        </div>

        {combinedActivity.length > 4 && (
          <div className="text-center pb-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-emerald-600 font-medium hover:underline cursor-pointer"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;