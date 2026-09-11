"use client";

import {useState} from "react";

import TopBar from "@/components/TopBar";
import BrandCard from "@/components/BrandCard";
import AddBrand from "@/components/AddBrand";
import DateSelector from "@/components/DateSelector";

import {employees} from "@/lib/data";


export default function Home(){


const [activeEmployee,setActiveEmployee] = useState<typeof employees[number]>({...employees[0], brands: []});


const [brands,setBrands] = useState<typeof employees[number]["brands"]>([]);



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

setBrands((current) => [...current, { name, platforms }]);

}



return(

<main className="min-h-screen bg-[#eef0f2] p-8">


<TopBar/>


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

{activeEmployee.name}

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

/>

))
}


</div>



</div>


</section>


</main>

)

}








