"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe, LockKeyhole, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Image from "next/image";

interface Template {
  Id: number;
  name: string;
  templateImage: string;
}

const OpenDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  const [isReplLoading, setIsReplLoading] = useState(false);
  const [template, setTemplate] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [title, setTitle] = useState("");
  const BACKEND_URL = "http://localhost:5000";

  useEffect(() => {
    const getTempaltes = async () => {
      const { data }: { data: Template } = await axios.get(
        `${BACKEND_URL}/api/v1/repls/getTemplate`
      );
      setTemplate(data);
    };
    getTempaltes();
  }, []);

  const createRepl = async () => {
    const { data, status } = await axios.get("/api/token");
    if (status == 200) {
      const token = data.token.value;
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/repls/create`,
        { template: selectedTemplate && selectedTemplate?.name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => !isReplLoading && setOpen(false)}>
      <DialogContent className="flex w-full max-w-2xl">
        <DialogHeader className="w-1/2">
          <DialogTitle>Template</DialogTitle>
          <DialogDescription>
            <div className="my-3">
              <Input placeholder="Nodejs" />
            </div>
            <div>
              {template.map(({ Id, name, templateImage }) => (
                <div
                  key={Id}
                  className={`flex gap-2 p-5 my-2 ${
                    selectedTemplate &&
                    selectedTemplate.Id == Id &&
                    "bg-gray-900"
                  } hover:bg-gray-900 rounded cursor-pointer`}
                  onClick={() => setSelectedTemplate({ Id, name })}
                >
                  <Image
                    src={templateImage}
                    alt="template"
                    width={20}
                    height={20}
                  />
                  <p>{name}</p>
                </div>
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogHeader className="w-1/2">
          <div className="my-3">
            <p className="leading-7 my-3">Title</p>
            <Input
              placeholder="Name your Repl"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex gap-4 my-3">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Repl type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Public">
                  <div className="flex gap-2 items-center">
                    <Globe />
                    <p>Public</p>
                  </div>
                </SelectItem>
                <SelectItem value="Private">
                  <div className="flex gap-2 items-center">
                    <LockKeyhole />
                    <p>Private</p>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full my-5" onClick={createRepl}>
            <Plus />
            Create Repl
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

const Repl = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Create</Button>
      <OpenDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Repl;
