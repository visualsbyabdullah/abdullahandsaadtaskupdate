"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

import TopBar from "@/components/TopBar";
import BrandCard from "@/components/BrandCard";
import AddBrand from "@/components/AddBrand";
import DateSelector from "@/components/DateSelector";

import {employees} from "@/lib/data";
import {supabase} from "@/lib/supabase";


export default function Home(){
const router = useRouter();
const [loading, setLoading] = useState(true);


const [activeEmployee,setActiveEmployee] = useState<typeof employees[number]>({...employees[0], brands: []});


const [brands,setBrands] = useState<typeof employees[number]["brands"]>([]);
const [storageKey, setStorageKey] = useState<string | null>(null);

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  if (hour < 21) return "Good evening";
  return "Good night";
}

useEffect(() => {
  let mounted = true;
  supabase.auth.getUser().then(({ data: { user } }) => {
    if (!mounted) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    const email = user.email?.toLowerCase() ?? "";
    const name = email.includes("saadsaleem") ? "Saad" : email.includes("imran") ? "Mian Imran Ali Shah" : "Abdullah";
    const key = `social-tracker-brands:${email}`;
    const savedBrands = window.localStorage.getItem(key);
    const userBrands = savedBrands ? JSON.parse(savedBrands) : [];
    setStorageKey(key);
    setActiveEmployee({ ...employees[0], name, brands: userBrands });
    setBrands(userBrands);
    setLoading(false);
  });
  return () => { mounted = false; };
}, [router]);

async function logout() {
  await supabase.auth.signOut();
  router.replace("/login");
}



function changeEmployee(name:string){

const employee = employees.find(
(item)=>item.name===name
);

if(employee){

setActiveEmployee(employee);
setBrands(employee.brands);

}

}



function addBrand(name:string, platforms:string[]){

setBrands((current) => {
  const next = [...current, { name, platforms }];
  if (storageKey) window.localStorage.setItem(storageKey, JSON.stringify(next));
  return next;
});

}

function deleteBrand(name: string) {
  setBrands((current) => {
    const next = current.filter((brand) => brand.name !== name);
    if (storageKey) window.localStorage.setItem(storageKey, JSON.stringify(next));
    return next;
  });
}



if (loading) return <main className="flex min-h-screen items-center justify-center bg-[#eef0f2] text-sm text-gray-500">Loading your workspace...</main>;

return(

<main className="min-h-screen bg-[#eef0f2] p-8">


<TopBar name={activeEmployee.name} onLogout={logout}/>


<section className="mt-6">


<div className="
min-h-[calc(100vh-64px)]
bg-white
rounded-[40px]
p-10
">


<div className="
flex
justify-between
items-end
">


<div>

<h1 className="text-[42px] font-semibold">

{greeting()}

</h1>


<p className="text-gray-400 mt-2">

Daily Content Tracker

</p>

</div>






</div>



<div className="flex justify-between items-center mt-8"><AddBrand onAdd={addBrand} existingNames={brands.map((brand) => brand.name)}/><DateSelector/></div>



<div className="
mt-10
grid
grid-cols-1 xl:grid-cols-2
gap-6
">


{
brands.map((brand)=>(

<BrandCard

key={brand.name}

name={brand.name}

platforms={brand.platforms}
onDelete={() => deleteBrand(brand.name)}

/>

))
}


</div>



</div>


</section>


</main>

)

}








