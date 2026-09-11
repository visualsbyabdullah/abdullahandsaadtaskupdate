"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

const formatDate = (date: Date) => date.toLocaleDateString("en-GB", {
  day: "numeric", month: "long", year: "numeric",
});

export default function DateSelector() {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 8, 11));
  const [visibleMonth, setVisibleMonth] = useState(new Date(2026, 8, 1));
  const calendarRef = useRef<HTMLDivElement>(null);
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = new Date(year, month, 1).getDay();

  useEffect(() => {
    if (!open) return;
    function closeOnOutsideClick(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, [open]);

  function changeMonth(offset: number) {
    setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1));
  }

  return (
    <div className="relative" onKeyDown={(event) => {
      if (event.key === "Escape") setOpen(false);
    }}>
      <button type="button" aria-expanded={open} aria-controls="date-calendar" onClick={() => {
        if (!open) setVisibleMonth(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
        setOpen((current) => !current);
      }} className="control-padding flex h-12 items-center justify-center gap-3 whitespace-nowrap rounded-full bg-[#f5f6f7] text-sm text-gray-700">
        <CalendarDays size={18} />
        {formatDate(selectedDate)}
      </button>

      {open && (
        <div ref={calendarRef} id="date-calendar" className="absolute right-0 top-16 z-50 w-[300px] rounded-[28px] border border-black/10 bg-white p-5 shadow-[0_18px_45px_rgba(0,0,0,0.12)]">
          <div className="mb-5 flex items-center justify-between">
            <button type="button" aria-label="Previous month" onClick={() => changeMonth(-1)} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100"><ChevronLeft size={18} /></button>
            <p className="font-semibold" aria-live="polite">{visibleMonth.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</p>
            <button type="button" aria-label="Next month" onClick={() => changeMonth(1)} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100"><ChevronRight size={18} /></button>
          </div>
          <div className="grid grid-cols-7 justify-items-center gap-1 text-center text-sm">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => <span key={day} className="mb-2 text-xs text-gray-400">{day}</span>)}
            {Array.from({ length: firstWeekday }, (_, index) => <span key={`empty-${index}`} aria-hidden="true" />)}
            {Array.from({ length: daysInMonth }, (_, index) => {
              const day = index + 1;
              const date = new Date(year, month, day);
              const selected = selectedDate.getFullYear() === year && selectedDate.getMonth() === month && selectedDate.getDate() === day;
              return (
                <button type="button" key={day} aria-label={formatDate(date)} aria-pressed={selected} onClick={() => {
                  setSelectedDate(date);
                  setOpen(false);
                }} className={`h-8 w-8 rounded-full ${selected ? "bg-black text-white hover:bg-neutral-800" : "hover:bg-gray-100"}`}>
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
