import { Button, Input, TextArea } from "@heroui/react";

import { BookPlus, Image as ImageIcon, DollarSign, Clock } from "lucide-react";

import { addCourse } from "@/lib/rooms/action";

const CATEGORIES = [
  "Whiteboard",
  "Projector",
  "WiFi",
  "TV Screen",
  "AC",
  "Coffee Machine",
];

const Addproducts = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-10">
        <div className="space-y-2 text-center">
          <div className="mx-auto w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
            <BookPlus className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-black text-slate-900">
            Create New
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-blue-800">
              Room
            </span>
          </h1>
          <p className="text-slate-500 font-medium">
            Share your knowledge with the world
          </p>
        </div>

        <form action={addCourse} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2 space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-bold text-slate-700 ml-1"
              >
                Room Title
              </label>
              <Input
                id="name"
                name="name"
                required
                placeholder="e.g. Conference Room A"
                className="w-full h-14 border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl bg-white transition-all duration-300 shadow-none"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-bold text-slate-700 ml-1"
              >
                Description
              </label>
              <TextArea
                id="description"
                required
                name="description"
                placeholder="What facilities does this room have?"
                className="w-full h-32 border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl bg-white transition-all duration-300 shadow-none resize-none"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="image"
                className="text-sm font-bold text-slate-700 ml-1"
              >
                Image URL
              </label>
              <Input
                id="image"
                name="image"
                required
                type="url"
                placeholder="https://images.unsplash.com/..."
                startContent={<ImageIcon className="w-5 h-5 text-slate-400" />}
                className="w-full h-14 border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl bg-white transition-all duration-300 shadow-none"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="floor"
                className="text-sm font-bold text-slate-700 ml-1"
              >
                Floor
              </label>
              <Input
                id="floor"
                name="floor"
                required
                placeholder="e.g. Floor 3"
                className="w-full h-14 border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl bg-white transition-all duration-300 shadow-none"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="price"
                className="text-sm font-bold text-slate-700 ml-1"
              >
                Hourly Rate ($)
              </label>
              <Input
                id="price"
                name="price"
                required
                type="number"
                placeholder="0.00"
                startContent={<DollarSign className="w-5 h-5 text-slate-400" />}
                className="w-full h-14 border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl bg-white transition-all duration-300 shadow-none"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="Capacity"
                className="text-sm font-bold text-slate-700 ml-1"
              >
                Capacity
              </label>
              <Input
                id="Capacity"
                required
                name="Capacity"
                type="text"
                placeholder="e.g. 20 persons"
                startContent={<Clock className="w-5 h-5 text-slate-400" />}
                className="w-full h-14 border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl bg-white transition-all duration-300 shadow-none"
              />
            </div>

            <div className="md:col-span-2 space-y-3">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Amenities
              </label>
              <div className="grid grid-cols-2 gap-4">
                {CATEGORIES.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-3 border-2 border-slate-200 rounded-2xl px-4 py-3 cursor-pointer hover:border-blue-500 transition-all"
                  >
                    <input
                      type="checkbox"
                      name="amenities"
                      value={cat}
                      className="w-5 h-5 accent-blue-600"
                    />
                    <span className="text-slate-700 font-medium">{cat}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <Button
              variant="flat"
              size="lg"
              className="flex-1 font-bold rounded-2xl h-14"
            >
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
              size="lg"
              className="flex-1 font-black rounded-2xl h-14 shadow-xl shadow-blue-600/20"
            >
              Publish Room
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addproducts;
