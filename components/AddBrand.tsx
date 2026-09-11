"use client";

import { useRef, useState, type FormEvent } from "react";
import { Plus, X } from "lucide-react";
import PlatformLogo, { socialPlatforms } from "./PlatformLogo";

export default function AddBrand({ onAdd, existingNames }: {
  onAdd: (name: string, platforms: string[]) => void;
  existingNames: string[];
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState(socialPlatforms);
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return setError("Enter a brand name.");
    if (existingNames.some((value) => value.toLowerCase() === trimmed.toLowerCase())) {
      return setError("A brand with this name already exists.");
    }
    if (!selected.length) return setError("Select at least one platform.");
    onAdd(trimmed, socialPlatforms.filter((platform) => selected.includes(platform)));
    dialog.current?.close();
  }

  return (
    <>
      <button type="button" onClick={() => {
        setName("");
        setSelected(socialPlatforms);
        setError("");
        dialog.current?.showModal();
      }} className="control-padding flex h-12 items-center gap-2 rounded-2xl bg-black text-white hover:bg-neutral-800">
        <Plus size={18} /> Add Brand
      </button>
      <dialog ref={dialog} aria-labelledby="add-brand-title" className="m-auto max-h-[90dvh] w-[calc(100%-32px)] max-w-lg overflow-y-auto rounded-[32px] bg-white p-6 text-[#111] shadow-2xl backdrop:bg-black/45 backdrop:backdrop-blur-sm sm:p-8">
        <div className="mb-7 flex items-start justify-between gap-4">
          <div>
            <h2 id="add-brand-title" className="text-2xl font-semibold">Add a brand</h2>
            <p className="mt-2 text-sm text-gray-500">Choose the platforms you want to track.</p>
          </div>
          <button type="button" aria-label="Close" onClick={() => dialog.current?.close()} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"><X size={18} /></button>
        </div>
        <form onSubmit={submit} className="space-y-6">
          <div>
            <label htmlFor="brand-name" className="mb-2 block text-sm font-medium">Brand name</label>
            <input id="brand-name" autoFocus maxLength={80} value={name} onChange={(event) => { setName(event.target.value); setError(""); }} placeholder="e.g. Acme Studio" aria-describedby={error ? "brand-error" : undefined} className="control-padding h-12 w-full rounded-2xl bg-[#f5f6f7] text-sm outline-none focus:ring-2 focus:ring-black" />
          </div>
          <fieldset>
            <legend className="mb-3 text-sm font-medium">Social platforms</legend>
            <div className="space-y-2">
              {socialPlatforms.map((platform) => (
                <label key={platform} className="control-padding flex cursor-pointer items-center gap-3 rounded-2xl bg-[#f5f6f7] py-3 hover:bg-gray-100">
                  <PlatformLogo name={platform} />
                  <span className="flex-1 text-sm font-medium">{platform}</span>
                  <input type="checkbox" checked={selected.includes(platform)} onChange={() => {
                    setSelected((current) => current.includes(platform) ? current.filter((value) => value !== platform) : [...current, platform]);
                    setError("");
                  }} className="h-5 w-5 accent-black" />
                </label>
              ))}
            </div>
          </fieldset>
          {error && <p id="brand-error" role="alert" className="text-sm text-red-600">{error}</p>}
          <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
            <button type="button" onClick={() => dialog.current?.close()} className="control-padding h-12 rounded-2xl bg-gray-100 text-sm hover:bg-gray-200">Cancel</button>
            <button type="submit" className="control-padding flex h-12 items-center gap-2 rounded-2xl bg-black text-sm text-white hover:bg-neutral-800"><Plus size={18} /> Add Brand</button>
          </div>
        </form>
      </dialog>
    </>
  );
}
