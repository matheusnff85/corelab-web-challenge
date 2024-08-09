"use client";
import React, { useState } from "react";
import { Check, PaintBucket, Pencil, Star, X } from "lucide-react";

import { ITask } from "../store/taskStore";

interface taskCardProps {
  task: ITask;
}

export function TaskCard({ task }: taskCardProps) {
  const { id, title, content, color, isFavorite } = task;
  const [isFavorited, setFavorite] = useState(isFavorite);
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskContent, setTaskContent] = useState(content);
  const [taskColor, setTaskColor] = useState(color);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div
      className="md:w-[550px] bg-white mt-4 mb-10 rounded-2xl w-80 mx-auto shadow-md shadow-zinc-400"
      key={task.id}
    >
      <div className="flex items-center py-5 px-4 justify-between border-b-2 border-b-gray-100 w-full">
        <input
          type="text"
          placeholder="Título"
          className="outline-none"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        {isFavorited ? (
          <Star
            size={25}
            fill="#FFC222"
            className="cursor-pointer"
            onClick={() => setFavorite(false)}
          />
        ) : (
          <Star
            size={25}
            className="cursor-pointer"
            onClick={() => setFavorite(true)}
          />
        )}
      </div>
      <input
        type="text"
        placeholder="Criar nota..."
        value={taskContent}
        className="px-4 py-5 w-full outline-none bg-transparent text-sm block"
        onChange={(e) => setTaskContent(e.target.value)}
        required
      />

      <div className="flex w-full justify-between items-center p-2">
        <div>
          <Pencil></Pencil>
          <PaintBucket size={25} className="cursor-pointer" />
        </div>
        <div>
          {isEditing && <Check></Check>}
          <X></X>
        </div>
      </div>
    </div>
  );
}
