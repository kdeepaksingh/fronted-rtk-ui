import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

interface TabItem {
  value: string;
  children?: TabItem[];
}

interface UseFindActiveTabProps {
  items: TabItem[];
  active?: string | null;
}

interface ActiveTabResult {
  activeTab: string;
  subTab: string;
  tools: TabItem[] | undefined;
}

export const useFindActiveTab = ({
  items,
  active,
}: UseFindActiveTabProps): ActiveTabResult => {
  const [params] = useSearchParams();

  const activeTab = useMemo(
    () => active || params.get("tab"),
    [params, active]
  );

  return useMemo(() => {
    let parentTab: TabItem | null = null;
    let childTab: string = "";

    const isinDeepChild = (
      children: TabItem[] = [],
      active: string
    ): boolean => {
      return children.some(
        (item) =>
          item.value.toLowerCase() === active.toLowerCase() ||
          (item.children?.length && isinDeepChild(item.children, active))
      );
    };

    if (activeTab) {
      items.forEach((item) => {
        if (item.children && isinDeepChild(item.children, activeTab)) {
          parentTab = item;
          childTab = activeTab;
        }
      });
    }

    if (!parentTab) {
      parentTab = items[0];
      childTab = items[0]?.children?.[0]?.value || "";
    }

    return {
      activeTab: parentTab?.value,
      subTab: childTab,
      tools: parentTab?.children,
    };
  }, [activeTab, items]);
};

// const tabItems = [
//     {
//       value: "dashboard",
//       children: [
//         { value: "overview" },
//         { value: "stats" }
//       ],
//     },
//     {
//       value: "settings",
//       children: [
//         { value: "profile" },
//         { value: "security" }
//       ],
//     },
//   ];

// import React from "react";
// import { useFindActiveTab } from "../hooks/useFindActiveTab";
// import { useNavigate, useSearchParams } from "react-router-dom";

// const TabExample: React.FC = () => {
//   const { activeTab, subTab, tools } = useFindActiveTab({
//     items: tabItems,
//     active: null, // or some default tab string like "overview"
//   });

//   const navigate = useNavigate();
//   const [params] = useSearchParams();

//   return (
//     <div>
//       <h2 className="text-xl font-bold">Active Parent Tab: {activeTab}</h2>
//       <h3 className="text-lg">Active Sub Tab: {subTab}</h3>

//       <div className="flex space-x-4 mt-4">
//         {tools?.map((tool) => (
//           <button
//             key={tool.value}
//             className={`px-4 py-2 rounded ${
//               subTab === tool.value ? "bg-blue-500 text-white" : "bg-gray-100"
//             }`}
//             onClick={() => {
//               navigate(`?tab=${tool.value}`);
//             }}
//           >
//             {tool.value}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TabExample;
