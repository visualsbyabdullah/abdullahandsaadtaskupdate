import PlatformRow from "./PlatformRow";


export default function BrandCard({
name,
platforms
}:{
name:string,
platforms:string[]
}){


return(

<div className="
rounded-[32px]
bg-[#f7f7f8]
p-7
">


<div className="flex justify-between items-center">

<h2 className="
text-[24px]
font-semibold
">

{name}

</h2>


<span className="
text-xs
text-gray-400
">

Daily Posts

</span>


</div>



<div className="
mt-6
space-y-4
">


{
platforms.map((platform)=>(

<PlatformRow

key={platform}

name={platform}

/>

))
}


</div>



</div>

)

}
