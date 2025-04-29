import { createContext, useContext, useEffect, useState } from "react";
import data from "/src/assets/data.js";

const MainContext = createContext();

function App() {
  return (
    <Wrapper>
      <Header />
      <Main>
        <Filter/>
        <ExtensionList/>
      </Main>
    </Wrapper>
  )
}

export default App;


function Wrapper({children}){
  return (
    <div className="light-gradient dark:dark-gradient font-[Noto_Sans]">
      <div className="max-w-[1440px] _mx-auto px-4.25 pt-5.25 pb-20 min-h-screen ">
        {children}
      </div>
    </div>
  )
}

function ExtensionCard({name, description, logo, isActive, setExtensionsList}){
  const [isChecked, setIsChecked] = useState(isActive);
  function handleClick(){
    setIsChecked(isChecked => !isChecked)
    setExtensionsList(oldList =>{
      return oldList.map(extension => {
        if (extension.name == name) extension.isActive = !isActive;
        return extension;
      })
    })
  }
  return (
    <div className={` bg-white dark:bg-clr-neutral-800 dark:ring dark:ring-clr-neutral-100/50  shadow-lg rounded-3xl grid grid-cols-[auto_1fr] _outline px-4.5 py-4.75 gap-x-4 gap-y-6 desktop:px-4.75 desktop:pt-4.25 grid-rows-[1fr_auto]`}>
      <div className="">
        <img src={logo} alt="extension icon" />
      </div>
      <div>
        <h2 className="font-bold text-[1.3rem]/6 mb-2 text-clr-neutral-900 desktop:text-xl/6 dark:text-white">{name}</h2>
        <p className="text-[15px]/5.5 text-clr-neutral-600 dark:text-clr-neutral-200">{description}</p>
      </div>
      <div className="col-span-2 flex justify-between items-center pt-0.25">
        <button className="border border-black/30 dark:border-clr-neutral-100/50 pl-[calc(var(--pad-x)+1px)] pr-[calc(var(--pad-x)-1px)] h-9 rounded-2xl tracking-tight [--pad-x:--spacing(4)] dark:text-white">Remove</button>
        <ToggleBtn isChecked={isChecked} handleClick={handleClick}></ToggleBtn>
      </div>
    </div>
  )
}

function ToggleBtn({isChecked, handleClick}){
  return(
    <button className={`relative w-(--btn-w) h-(--btn-h) rounded-[calc(var(--btn-h)/2)] bg-clr-neutral-300 dark:bg-clr-neutral-600 cursor-pointer duration-200 after:content-[""] after:absolute after:rounded-full after:top-(--inner-pad) after:left-(--inner-pad) after:size-(--circle-size) after:bg-white after:duration-200  [--btn-h:--spacing(5)] [--btn-w:--spacing(9.25)] [--inner-pad:--spacing(0.5)] [--circle-size:calc(var(--btn-h)-var(--inner-pad)*2)] ${isChecked && "after:left-[calc(var(--btn-w)-var(--circle-size)-var(--inner-pad))] bg-clr-red-700 dark:bg-clr-red-400"}`} onClick={handleClick} role="switch" aria-label="Toggle button">
    </button>
  )
}

function ExtensionList(){
  const {extensionsList, setExtensionsList, currentFilter} = useContext(MainContext);
  return (
    <div className="grid gap-y-5.5 mt-10.5 desktop:mt-4 grid-cols-[repeat(auto-fit,minmax(341px,1fr))]  max-xs:grid-cols-1 gap-x-3.75 desktop:gap-y-4.25 desktop:auto-rows-[195px]">
      {extensionsList.map(extension =>(
        (currentFilter == 'all' || (currentFilter == 'active' && extension.isActive) || (currentFilter == 'inactive' && !extension.isActive)) &&
        <ExtensionCard {...extension} setExtensionsList={setExtensionsList} />  
      ))}
    </div>
  )
}

function FilterBtn({selected, children, setCurrentFilter}){
  const handleClick = () => {
    setCurrentFilter(children.toLowerCase())
  }
  return (
    <button className={`cursor-pointer shadow-lg px-4.75 h-11 rounded-3xl text-xl  ${selected? "bg-clr-red-700 dark:bg-clr-red-400 dark:text-black text-white": "bg-white text-clr-neutral-900 dark:bg-clr-neutral-700 dark:text-white ring ring-clr-neutral-300/40 "}`} onClick={handleClick}>
      {children}
    </button>
  )
}

function Filter(){
  const {currentFilter, setCurrentFilter} = useContext(MainContext)
  return (
    <div className="text-center desktop:flex desktop:justify-between">
      <h1 className="text-[2rem] font-bold mb-4.5 text-clr-neutral-900 dark:text-white desktop:mt-1">Extensions List</h1>
      <div className="flex gap-2.75  justify-center desktop:justify-start desktop:pr-1 desktop:mt-1.25 max-xs:flex-wrap">
        <FilterBtn selected={'all' == currentFilter} setCurrentFilter={setCurrentFilter}>All</FilterBtn>
        <FilterBtn selected={'active' == currentFilter} setCurrentFilter={setCurrentFilter}>Active</FilterBtn>
        <FilterBtn selected={'inactive' == currentFilter} setCurrentFilter={setCurrentFilter}>Inactive</FilterBtn>
      </div>
    </div>
  )
}

function Main({children}) {
  const [extensionsList, setExtensionsList] = useState(data);
  const [currentFilter, setCurrentFilter] = useState('all')
  return (
    <MainContext.Provider value={{extensionsList, setExtensionsList, currentFilter, setCurrentFilter}}>
      <main className="pt-8.5 max-w-[1170px] mx-auto desktop:pt-14.5">
        {children}
      </main>
    </MainContext.Provider>
  )
}

function DarkModeBtn() {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('darkMode') == "true")
  
  function turnOnDarkMOde(isDarkMode) {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
  const toggleDarkMode = () => {
    setIsDarkMode(isDarkMode =>{
      const newMode = !isDarkMode
      localStorage.setItem('darkMode', JSON.stringify(newMode))
      turnOnDarkMOde(newMode)
      return newMode
    })
  }
  useEffect(()=>{
    const isDarkMode = JSON.parse(localStorage.getItem('darkMode'))
    turnOnDarkMOde(isDarkMode)
  })
  return (
    <button className="bg-clr-neutral-100 dark:bg-clr-neutral-700 size-12.25 flex justify-center items-center rounded-xl cursor-pointer" onClick={toggleDarkMode}>
        {isDarkMode ? (
          <img src="/images/icon-sun.svg" alt="sun icon" />
        ) : (
          <img src="/images/icon-moon.svg" alt="moon icon" />
        )}
      </button>
  )
}

function Header(props){
  return (
    <header className="shadow-sm min-h-16 rounded-lg bg-white dark:bg-clr-neutral-800 flex items-center justify-between px-2.75 max-w-[1170px] mx-auto desktop:mt-5 desktop:min-h-18.5 desktop:rounded-3xl desktop:px-4">
      <a href="#" className="cursor-pointer">
        <img src="/images/logo.svg" alt="logo icon" className="dark:invert-100" />
      </a>
      <DarkModeBtn />
    </header>
  )
}