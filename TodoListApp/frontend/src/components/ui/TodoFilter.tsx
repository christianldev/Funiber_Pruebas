import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store/filters/reducers";
import { setFilter } from "../../store/filters/actions";
import { AppDispatch } from "../../store/store";
import useAuthContext from "../../hooks/useAuthContext";

export default function TodoFilter() {
  const dispatch = useDispatch<AppDispatch>();
  const currentFilter = useSelector((state: AppState) => state.filter);
  const { user } = useAuthContext();

  const handleFilterChange = (filter: string) => {
    dispatch(setFilter(user, filter));
  };

  return (
    <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
      <ul
        className="flex flex-wrap -mb-px text-sm font-medium text-center"
        id="default-styled-tab"
        data-tabs-toggle="#default-styled-tab-content"
        data-tabs-active-classes="text-purple-600 hover:text-purple-600 dark:text-purple-500 dark:hover:text-purple-500 border-purple-600 dark:border-purple-500"
        data-tabs-inactive-classes="dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300"
        role="tablist"
      >
        <li role="presentation">
          <button
            className={`inline-block p-4 border-b-2 rounded-t-lg ${
              currentFilter === "all" ? "border-blue-500" : ""
            }`}
            onClick={() => handleFilterChange("all")}
            id="profile-styled-tab"
            data-tabs-target="#styled-profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            Todos
          </button>
        </li>
        <li role="presentation">
          <button
            className={`inline-block p-4 border-b-2 rounded-t-lg ${
              currentFilter === "pending" ? "border-red-500" : ""
            }`}
            onClick={() => handleFilterChange("pending")}
            id="profile-styled-tab"
            data-tabs-target="#styled-profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            Pendientes
          </button>
        </li>
        <li role="presentation">
          <button
            className={`inline-block p-4 border-b-2 rounded-t-lg ${
              currentFilter === "in progress" ? "border-yellow-500" : ""
            }`}
            onClick={() => handleFilterChange("in progress")}
            id="dashboard-styled-tab"
            data-tabs-target="#styled-dashboard"
            type="button"
            role="tab"
            aria-controls="dashboard"
            aria-selected="false"
          >
            En progreso
          </button>
        </li>
        <li role="presentation">
          <button
            className={`inline-block p-4 border-b-2 rounded-t-lg ${
              currentFilter === "completed" ? "border-green-500" : ""
            }`}
            onClick={() => handleFilterChange("completed")}
            id="settings-styled-tab"
            data-tabs-target="#styled-settings"
            type="button"
            role="tab"
            aria-controls="settings"
            aria-selected="false"
          >
            Completados
          </button>
        </li>
      </ul>
    </div>
  );
}
