import { api } from "@/utils/api";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function AddItem({ open }: { open: boolean }) {
  const [itemName, setItemName] = useState<string>("");
  const queryClient = useQueryClient();

  const { mutateAsync } = api.item.addItem.useMutation({
    onSettled: () => queryClient.invalidateQueries(),
  });

  return (
    <div
      className={`mt-5 overflow-hidden transition-all duration-300 ${open ? "max-h-80" : "max-h-0"}`}
    >
      <input
        type="text"
        name="add-item"
        value={itemName}
        className="mr-3 w-full max-w-3xl rounded-md border border-amber-400 bg-transparent px-2 py-2 text-slate-100 outline-none placeholder:text-slate-500"
        placeholder="Press Enter Key to add.."
        onChange={(e) => setItemName(e.target.value)}
        onKeyDown={async (e) => {
          if (itemName.length < 5 || e.key !== "Enter") return null;
          else {
            setItemName("");
            await mutateAsync({ name: itemName });
          }
        }}
      />
      <span className="mt-1 text-xs text-slate-300">
        Note: Clicking the text on the list toggles its checked state!
      </span>
    </div>
  );
}
