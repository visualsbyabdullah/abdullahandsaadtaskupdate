"use client";

import { useState } from "react";
import { Link2, Save } from "lucide-react";
import PlatformLogo from "./PlatformLogo";


export default function PlatformRow({
name
}:{
name:string
}){
  const [link, setLink] = useState("");
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const isValidLink = (() => {
    try {
      const url = new URL(link.trim());
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  })();




return(

<div className="
min-h-[62px]
py-3
gap-3
flex-wrap
bg-white
rounded-2xl
px-5
flex
items-center
justify-between
">


<div className="flex items-center">


<PlatformLogo name={name}/>


</div>



<div className="flex min-w-0 flex-1 items-center justify-end gap-2">
<div className="
h-10
w-[220px]
max-w-full
rounded-xl
bg-[#f5f6f7]
flex
items-center
gap-2
control-padding
">

<Link2 size={14} className="text-gray-400"/>

<input
aria-label={`${name} post link`}
value={link}
onChange={(event) => setLink(event.target.value)}

placeholder="Paste post link"

className="
bg-transparent
outline-none
text-xs
w-full
min-w-0
"

/>


</div>

<button type="button" aria-label={`Save ${name} link`} onClick={() => {
  if (isValidLink) setUpdatedAt(new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }));
}} disabled={!isValidLink} className="control-padding flex h-10 shrink-0 items-center gap-2 rounded-xl bg-black text-xs text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40">
  <Save size={14} /> Save
</button>

{updatedAt && <time dateTime={new Date().toISOString()} className="hidden shrink-0 text-[11px] text-gray-400 sm:block">Updated {updatedAt}</time>}



</div>

</div>

)

}
