"use client";

import { UserCircle, LogOut } from "lucide-react";


export default function TopBar({ name, onLogout }: { name: string; onLogout: () => void }){

return(

<div className="
h-20
bg-black
text-white
rounded-[32px]
px-8
flex
items-center
justify-between
">


{/* Profile */}

<div className="flex items-center gap-3">

<div className="
h-12
w-12
rounded-full
bg-white/15
flex
items-center
justify-center
text-white
">

<UserCircle size={24}/>

</div>


<span className="font-medium">{name}</span>


</div>




{/* Right */}

<button type="button" onClick={onLogout} className="
h-12
control-padding
rounded-full
bg-[#f5f6f7]
text-black
flex
items-center
gap-2
text-sm
">

<LogOut size={17}/>

Logout

</button>


</div>

)

}

