import { useEffect, useState } from "react"
import "./index.css"
import { getHint } from "~utils/gemini";

import { FaArrowLeft, FaArrowRight, FaSyncAlt } from "react-icons/fa";
import { RiGeminiFill } from "react-icons/ri";

import { getDescription, getTitle } from "~utils/chromeFunctions";
import { Button } from "~component/Button";

function IndexPopup() {
    const [title, setTitle] = useState("");
    const [hints, setHints] = useState([]);
    const [hintIDX, setHintIDX] = useState(0);
    const [error, setError] = useState(false);

    const [hintsLoading, setHintsLoading] = useState(false);

    async function fetch() {
        const t = await getTitle();
        if (!t) {
            setError(true);
            return;
        }
        setTitle(t);

        const key = `hint_${t}`;
        chrome.storage.session.get([key], (result) => {
            console.log("session", result[key], key);
            if (result[key]) {
                setHints(result[key]);
            }
        });
    }

    useEffect(() => {
        fetch();
    }, [])

    async function handleRegenrate() {
        setHintsLoading(true);
        const key = `hint_${title}`;
        const description = await getDescription()
        console.log("getting from gemini...");
        const h = await getHint(title, description);
        chrome.storage.local.set({ [key]: h }) //persistant stroage
        chrome.storage.session.set({ [key]: h }) //volotiale storgae
        setHints(h);
        setHintsLoading(false);
    }

    async function handleGenerateHints() {
        setHintsLoading(true);
        const key = `hint_${title}`;

        const storedHints: string[] = await new Promise((resolve) => {
            chrome.storage.local.get([key], (res) => {
                resolve(res[key]);
            });
        });

        if (storedHints) {
            setHints(storedHints);
            chrome.storage.session.set({ [key]: storedHints }) //volotiale storgae

            setHintIDX(0);
            setHintsLoading(false);
            return
        }

        const description = await getDescription()
        console.log("getting from gemini...");
        const h = await getHint(title, description);
        chrome.storage.local.set({ [key]: h }) //persistant stroage
        chrome.storage.session.set({ [key]: h }) //volotiale storgae
        setHints(h);
        // setHints(["kagduiashdi asdhas diuashd iuashd asihd asidad", "aushdashd asdiuashd iashdi uadid", "haoshdiuashduas hdiuashd aisd"])

        setHintIDX(0);
        setHintsLoading(false);
    }

    function handlePrevHint() {
        setHintIDX(p => (p - 1) < 0 ? 2 : p - 1);
    }

    function handleNextHint() {
        setHintIDX(p => (p + 1) % 3);
    }

    if(error){
        return<main className="p-4 w-[300px] flex flex-col gap-4"> 
            <h1 className="text-xl font-bold text-red-500">Only works in leetcode/problems</h1>
        </main>
    }

    return (
        <main className="p-4 w-[300px] flex flex-col gap-4">
            <div>
                <h1 className="text-lg font-bold">Welcome to LeetBuddy</h1>
                <h3 className="font-bold text-neutral-600">Problem: {title}</h3>
            </div>

            <div className="text-sm text-neutral-900 whitespace-pre-wrap min-h-[70px] rounded-md p-1 bg-gray-100 outline-2 outline-dashed outline-neutral-400 relative">
                {hints.length == 0 ? "Tried to Solve it yourself first?" : hints[hintIDX]}

                {hints.length > 0 && <button className="absolute bottom-2 right-2" onClick={handleRegenrate}><FaSyncAlt className={`${hintsLoading && "animate-spin"}`} /></button>}
            </div>

            <div className=" flex flex-col gap-2">
                {hints.length == 0 ? <Button className="" onClick={handleGenerateHints}>Generate Hints <RiGeminiFill className={`${hintsLoading && "animate-spin"}`} /></Button>

                    :
                    <div className="flex gap-2 items-center">
                        <Button className="py-2" onClick={handlePrevHint}><FaArrowLeft /></Button>
                        <p className="outline outline-2 outline-neutral-400 w-14 flex justify-center items-center aspect-square rounded-full">{hintIDX + 1}</p>
                        <Button className="py-2" onClick={handleNextHint}><FaArrowRight /></Button>
                    </div>
                }

                <Button className="" onClick=""> Get complete Code <RiGeminiFill /> </Button>
            </div>

        </main>
    )
}

export default IndexPopup
