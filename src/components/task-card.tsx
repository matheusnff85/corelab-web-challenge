"use client";
import React, { useState } from "react";
import { Check, PaintBucket, Pencil, Star, X } from "lucide-react";

import { ITask, useTaskStore } from "../store/taskStore";
import { ColorPicker } from "./color-picker";

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
  const [colorPickerHidden, setColorPickerHidden] = useState(true);
  const taskStore = useTaskStore((store) => store);

  const editTask = async (type: string) => {
    const editedTask = {
      id,
      title: taskTitle,
      content: taskContent,
      color: taskColor,
      isFavorite: type === "fav" ? !isFavorited : isFavorited,
    };

    await taskStore.updateTask(id as string, editedTask);
    setIsEditing(false);
  };

  return (
    <div
      className={`flex flex-col relative rounded-3xl transition-colors duration-500 ease-in-out shadow-2xl p-2 text-base min-w-96 max-w-md min-h-128 sm:max-w-xl`}
      key={id}
      style={{ backgroundColor: taskColor }}
    >
      <div className="flex items-center py-5 px-4 justify-between border-b-2 border-b-gray-100 w-full">
        {isEditing ? (
          <input
            type="text"
            placeholder="Título"
            style={{ backgroundColor: taskColor }}
            className="outline-none"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
        ) : (
          <h1>{task.title}</h1>
        )}
        {isFavorited ? (
          <Star
            size={25}
            fill="#FFC222"
            className="cursor-pointer"
            onClick={() => {
              setFavorite(false);
              editTask("fav");
            }}
          />
        ) : (
          <Star
            size={25}
            className="cursor-pointer"
            onClick={() => {
              setFavorite(true);
              editTask("fav");
            }}
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
        <div className="relative flex gap-3 px-3 py-3">
          <Pencil
            size={25}
            onClick={() => setIsEditing(!isEditing)}
            className="cursor-pointer"
          ></Pencil>
          <PaintBucket
            size={25}
            className="cursor-pointer"
            onClick={() => setColorPickerHidden(!colorPickerHidden)}
          />
          {!colorPickerHidden && (
            <ColorPicker
              taskId={id as string}
              taskColor={taskColor}
              setTaskColor={setTaskColor}
              closeColorPicker={setColorPickerHidden}
            />
          )}
        </div>
        <div className="relative flex gap-3 px-3 py-3">
          {isEditing && <Check onClick={() => editTask("normal")}></Check>}
          <X></X>
        </div>
      </div>
    </div>
  );
}
