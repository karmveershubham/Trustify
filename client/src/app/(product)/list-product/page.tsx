"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

// Main categories
enum CategoryGroup {
  Vehicle = "Vehicle",
  Electronics = "Electronics",
  Books = "Books",
  Furniture = "Furniture",
  HomeAppliance = "HomeAppliance",
}

// Subcategories
enum SubCategory {
  Car = "Car",
  Bike = "Bike",
  Cycle = "Cycle",
  Mobile = "Mobile",
  Laptop = "Laptop",
  Book = "Book",
  Furniture = "Furniture",
  WashingMachine = "WashingMachine",
  Refrigerator = "Refrigerator",
  AirConditioner = "AirConditioner",
}

// Icons for categories
const categoryGroupIcons: Record<CategoryGroup, string> = {
  [CategoryGroup.Vehicle]: "🚗",
  [CategoryGroup.Electronics]: "💻",
  [CategoryGroup.Books]: "📚",
  [CategoryGroup.Furniture]: "🛋️",
  [CategoryGroup.HomeAppliance]: "🏠",
};

const subCategoryIcons: Record<SubCategory, string> = {
  [SubCategory.Car]: "🚗",
  [SubCategory.Bike]: "🏍️",
  [SubCategory.Cycle]: "🚲",
  [SubCategory.Mobile]: "📱",
  [SubCategory.Laptop]: "💻",
  [SubCategory.Book]: "📚",
  [SubCategory.Furniture]: "🛋️",
  [SubCategory.WashingMachine]: "🧺",
  [SubCategory.Refrigerator]: "🧊",
  [SubCategory.AirConditioner]: "❄️",
};

// Form field types
enum FormFieldType {
  Text = "text",
  Dropdown = "dropdown",
  Description = "description",
  Boolean = "boolean",
}

// Subcategory mapping
const categoryGroupToSubCategories: Record<CategoryGroup, SubCategory[]> = {
  [CategoryGroup.Vehicle]: [SubCategory.Car, SubCategory.Bike, SubCategory.Cycle],
  [CategoryGroup.Electronics]: [SubCategory.Mobile, SubCategory.Laptop],
  [CategoryGroup.Books]: [SubCategory.Book],
  [CategoryGroup.Furniture]: [SubCategory.Furniture],
  [CategoryGroup.HomeAppliance]: [
    SubCategory.WashingMachine,
    SubCategory.Refrigerator,
    SubCategory.AirConditioner,
  ],
};

// Backend attribute mapping for details object
const categoryAttributes: Record<SubCategory, string[]> = {
  Car: ["brand", "purchasedYear", "fuelType", "transmission", "kmDriven", "owner"],
  Bike: ["brand", "purchasedYear", "fuelType", "kmDriven", "owner"],
  Cycle: ["brand", "purchasedYear", "hasGear"],
  Mobile: ["brand", "purchasedYear", "ram", "storage"],
  Laptop: ["brand", "ram", "storage", "processor"],
  Furniture: ["furnitureType", "material", "condition"],
  Book: ["subcategory", "author", "publisher", "edition", "condition", "genre"],
  WashingMachine: ["brand", "capacity", "type"],
  Refrigerator: ["brand", "capacity", "type"],
  AirConditioner: ["brand", "capacity", "type"],
};

// Form schema (label, type, options, backendKey)
const formCategories: Record<
  CategoryGroup,
  Record<
    SubCategory,
    Array<{ label: string; type: FormFieldType; options?: string[]; backendKey: string; keyboard?: string }>
  >
> = {
  [CategoryGroup.Vehicle]: {
    [SubCategory.Mobile]: [],
    [SubCategory.Laptop]: [],
    [SubCategory.Book]: [],
    [SubCategory.Furniture]: [],
    [SubCategory.WashingMachine]: [],
    [SubCategory.Refrigerator]: [],
    [SubCategory.AirConditioner]: [],
    [SubCategory.Car]: [
      { label: "Brand", type: FormFieldType.Dropdown, options: ["Hyundai", "Suzuki", "Toyota", "Mahindra", "Ford", "Tata", "Other"], backendKey: "brand" },
      { label: "Purchased Year", type: FormFieldType.Text, keyboard: "number", backendKey: "purchasedYear" },
      { label: "Fuel Type", type: FormFieldType.Dropdown, options: ["Petrol", "Diesel", "Electric", "Hybrid"], backendKey: "fuelType" },
      { label: "Transmission", type: FormFieldType.Dropdown, options: ["Manual", "Automatic"], backendKey: "transmission" },
      { label: "Km Driven", type: FormFieldType.Text, keyboard: "number", backendKey: "kmDriven" },
      { label: "Owner", type: FormFieldType.Dropdown, options: ["First", "Second", "Third"], backendKey: "owner" },
      { label: "Title", type: FormFieldType.Text, backendKey: "title" },
      { label: "Description", type: FormFieldType.Description, backendKey: "description" },
    ],
    [SubCategory.Bike]: [
      { label: "Brand", type: FormFieldType.Dropdown, options: ["Honda", "Yamaha", "Suzuki", "Other"], backendKey: "brand" },
      { label: "Purchased Year", type: FormFieldType.Text, keyboard: "number", backendKey: "purchasedYear" },
      { label: "Fuel Type", type: FormFieldType.Dropdown, options: ["Petrol", "Electric"], backendKey: "fuelType" },
      { label: "Km Driven", type: FormFieldType.Text, keyboard: "number", backendKey: "kmDriven" },
      { label: "Owner", type: FormFieldType.Dropdown, options: ["First", "Second", "Third"], backendKey: "owner" },
      { label: "Title", type: FormFieldType.Text, backendKey: "title" },
      { label: "Description", type: FormFieldType.Description, backendKey: "description" },
    ],
    [SubCategory.Cycle]: [
      { label: "Brand", type: FormFieldType.Dropdown, options: ["Hero", "Firefox", "Btwin", "Hercules", "BSA", "Avon", "Montra", "Other"], backendKey: "brand" },
      { label: "Has Gear", type: FormFieldType.Boolean, backendKey: "hasGear" },
      { label: "Purchased Year", type: FormFieldType.Text, keyboard: "number", backendKey: "purchasedYear" },
      { label: "Title", type: FormFieldType.Text, backendKey: "title" },
      { label: "Description", type: FormFieldType.Description, backendKey: "description" },
    ],
  },
  [CategoryGroup.Electronics]: {
    [SubCategory.Mobile]: [
      { label: "Brand", type: FormFieldType.Dropdown, options: ["Apple", "Samsung", "OnePlus", "Realme", "Nokia", "Google Pixel", "Redmi", "Motorola", "Oppo", "Other"], backendKey: "brand" },
      { label: "Purchased Year", type: FormFieldType.Text, keyboard: "number", backendKey: "purchasedYear" },
      { label: "RAM", type: FormFieldType.Dropdown, options: ["4GB", "6GB", "8GB", "12GB", "16GB"], backendKey: "ram" },
      { label: "Storage", type: FormFieldType.Dropdown, options: ["64GB", "128GB", "256GB", "512GB", "1TB"], backendKey: "storage" },
      { label: "Title", type: FormFieldType.Text, backendKey: "title" },
      { label: "Description", type: FormFieldType.Description, backendKey: "description" },
    ],
    [SubCategory.Laptop]: [
      { label: "Brand", type: FormFieldType.Dropdown, options: ["Dell", "HP", "Apple", "Asus", "Lenovo", "Redmi", "Samsung", "Other"], backendKey: "brand" },
      { label: "RAM", type: FormFieldType.Dropdown, options: ["8GB", "16GB", "32GB"], backendKey: "ram" },
      { label: "Storage", type: FormFieldType.Dropdown, options: ["256GB SSD", "512GB SSD", "1TB", "Other"], backendKey: "storage" },
      { label: "Processor", type: FormFieldType.Dropdown, options: ["Intel i5", "Intel i7", "AMD Ryzen 5", "M1 chip", "M2 chip", "Other"], backendKey: "processor" },
      { label: "Title", type: FormFieldType.Text, backendKey: "title" },
      { label: "Description", type: FormFieldType.Description, backendKey: "description" },
    ],
    [SubCategory.Car]: [],
    [SubCategory.Bike]: [],
    [SubCategory.Cycle]: [],
    [SubCategory.Book]: [],
    [SubCategory.Furniture]: [],
    [SubCategory.WashingMachine]: [],
    [SubCategory.Refrigerator]: [],
    [SubCategory.AirConditioner]: [],
  },
  [CategoryGroup.Books]: {
    [SubCategory.Book]: [
      { label: "Subcategory", type: FormFieldType.Dropdown, options: ["Fiction", "Educational", "Comics"], backendKey: "subcategory" },
      { label: "Title", type: FormFieldType.Text, backendKey: "title" },
      { label: "Author", type: FormFieldType.Text, backendKey: "author" },
      { label: "Publisher", type: FormFieldType.Text, backendKey: "publisher" },
      { label: "Edition", type: FormFieldType.Text, backendKey: "edition" },
      { label: "Condition", type: FormFieldType.Dropdown, options: ["New", "Like New", "Used"], backendKey: "condition" },
      { label: "Genre", type: FormFieldType.Text, backendKey: "genre" },
      { label: "Description", type: FormFieldType.Description, backendKey: "description" },
    ],
    [SubCategory.Car]: [],
    [SubCategory.Bike]: [],
    [SubCategory.Cycle]: [],
    [SubCategory.Mobile]: [],
    [SubCategory.Laptop]: [],
    [SubCategory.Furniture]: [],
    [SubCategory.WashingMachine]: [],
    [SubCategory.Refrigerator]: [],
    [SubCategory.AirConditioner]: [],
  },
  [CategoryGroup.Furniture]: {
    [SubCategory.Car]: [],
    [SubCategory.Bike]: [],
    [SubCategory.Cycle]: [],
    [SubCategory.Mobile]: [],
    [SubCategory.Laptop]: [],
    [SubCategory.Book]: [],
    [SubCategory.WashingMachine]: [],
    [SubCategory.Refrigerator]: [],
    [SubCategory.AirConditioner]: [],
    [SubCategory.Furniture]: [
      { label: "Type", type: FormFieldType.Dropdown, options: ["Sofa", "Table", "Chair", "Bed", "Cupboard", "Shelf", "Dining Set", "Other"], backendKey: "furnitureType" },
      { label: "Material", type: FormFieldType.Dropdown, options: ["Wood", "Metal", "Plastic", "Glass", "Leather", "Fabric", "Other"], backendKey: "material" },
      { label: "Condition", type: FormFieldType.Dropdown, options: ["New", "Good", "Needs Repair"], backendKey: "condition" },
      { label: "Title", type: FormFieldType.Text, backendKey: "title" },
      { label: "Description", type: FormFieldType.Description, backendKey: "description" },
    ],
  },
  [CategoryGroup.HomeAppliance]: {
    [SubCategory.WashingMachine]: [
      { label: "Brand", type: FormFieldType.Dropdown, options: ["LG", "Samsung"], backendKey: "brand" },
      { label: "Capacity", type: FormFieldType.Text, keyboard: "number", backendKey: "capacity" },
      { label: "Type", type: FormFieldType.Dropdown, options: ["Top Load", "Front Load"], backendKey: "type" },
      { label: "Title", type: FormFieldType.Text, backendKey: "title" },
      { label: "Description", type: FormFieldType.Description, backendKey: "description" },
    ],
    [SubCategory.Refrigerator]: [
      { label: "Brand", type: FormFieldType.Dropdown, options: ["LG", "Samsung", "Whirlpool"], backendKey: "brand" },
      { label: "Capacity (L)", type: FormFieldType.Text, keyboard: "number", backendKey: "capacity" },
      { label: "Type", type: FormFieldType.Dropdown, options: ["Single Door", "Double Door"], backendKey: "type" },
      { label: "Title", type: FormFieldType.Text, backendKey: "title" },
      { label: "Description", type: FormFieldType.Description, backendKey: "description" },
    ],
    [SubCategory.AirConditioner]: [
      { label: "Brand", type: FormFieldType.Dropdown, options: ["LG", "Samsung", "Daikin"], backendKey: "brand" },
      { label: "Capacity (Ton)", type: FormFieldType.Text, keyboard: "number", backendKey: "capacity" },
      { label: "Type", type: FormFieldType.Dropdown, options: ["Window AC", "Split AC"], backendKey: "type" },
      { label: "Title", type: FormFieldType.Text, backendKey: "title" },
      { label: "Description", type: FormFieldType.Description, backendKey: "description" },
    ],
    [SubCategory.Car]: [],
    [SubCategory.Bike]: [],
    [SubCategory.Cycle]: [],
    [SubCategory.Mobile]: [],
    [SubCategory.Laptop]: [],
    [SubCategory.Book]: [],
    [SubCategory.Furniture]: [],
  },
};

const ListingPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const [selectedCategoryGroup, setSelectedCategoryGroup] = useState<CategoryGroup | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [price, setPrice] = useState<string>("");

  // Reset form when subcategory changes
  useEffect(() => {
    setFormValues({});
  }, [selectedSubCategory]);

  const handleCategoryGroupSelect = (group: CategoryGroup) => {
    setSelectedCategoryGroup(group);
    setSelectedSubCategory(null);
  };

  const handleSubCategorySelect = (sub: SubCategory) => {
    setSelectedSubCategory(sub);
  };

  const handleInputChange = (backendKey: string, value: any) => {
    setFormValues(prev => ({
      ...prev,
      [backendKey]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  // Render form fields
  const renderField = (field: { label: string; type: FormFieldType; options?: string[]; backendKey: string; keyboard?: string }) => {
    const { label, type, options, backendKey } = field;
    switch (type) {
      case FormFieldType.Dropdown:
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md"
              value={formValues[backendKey] ?? ""}
              onChange={(e) => handleInputChange(backendKey, e.target.value)}
              required
            >
              <option value="">Select {label}</option>
              {options?.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        );
      case FormFieldType.Boolean:
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md"
              value={formValues[backendKey] ?? ""}
              onChange={(e) => handleInputChange(backendKey, e.target.value === "true")}
              required
            >
              <option value="">Select {label}</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        );
      case FormFieldType.Text:
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
              type={field.keyboard === "number" ? "number" : "text"}
              className="w-full p-3 border border-gray-300 rounded-md"
              value={formValues[backendKey] ?? ""}
              onChange={(e) => handleInputChange(backendKey, e.target.value)}
              required
            />
          </div>
        );
      case FormFieldType.Description:
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md min-h-32"
              value={formValues[backendKey] ?? ""}
              onChange={(e) => handleInputChange(backendKey, e.target.value)}
              required
            />
          </div>
        );
      default:
        return null;
    }
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCategoryGroup || !selectedSubCategory) {
      toast.message("Please select category and subcategory");
      return;
    }
    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    // Compose the details object for backend
    const details: Record<string, any> = {};
    for (const key of categoryAttributes[selectedSubCategory]) {
      if (formValues[key] !== undefined) {
        details[key] = formValues[key];
      }
    }

    // Compose FormData for backend
    const data = new FormData();
    data.append("userId", userId || "");
    data.append("label", selectedCategoryGroup);
    data.append("subCategory", selectedSubCategory);
    data.append("title", formValues["title"] || "");
    data.append("description", formValues["description"] || "");
    data.append("price", price);
    data.append("image", image);
    data.append("details", JSON.stringify(details));

    console.log("Details:", details);
    for (const [key, value] of data.entries()) {
      console.log(`${key}:`, value);
    }


    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/listings/add-product`, {
        method: "POST",
        credentials: "include",
        body: data,
      });
      const result = await response.json();
      if (response.ok) {
        toast.success("Product added successfully!");
        router.push(`/profile?userId=${userId}`);
      } else {
        toast.error(result.message || "Error adding product");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EDF0FD] to-white py-12 pt-20 mt-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-6 bg-slate-500 text-white">
            <h1 className="text-3xl font-bold">Add New Product</h1>
            <p className="text-slate-200 mt-2">Fill in the details to list your product</p>
          </div>
          {/* Horizontal Category Bar */}
          <div className="flex overflow-x-auto gap-4 px-6 py-4 border-b bg-gray-50">
            {Object.values(CategoryGroup).map((group) => (
              <div
                key={group}
                onClick={() => handleCategoryGroupSelect(group)}
                className={`flex items-center p-4 rounded-lg cursor-pointer min-w-[120px] transition-all duration-200 ${
                  selectedCategoryGroup === group
                    ? "bg-blue-100 border-2 border-blue-500"
                    : "bg-white border hover:bg-gray-50"
                }`}
              >
                <div className="text-2xl mr-2">{categoryGroupIcons[group]}</div>
                <span className="text-sm font-medium">{group}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-1 min-h-[600px]">
            {/* Subcategory Sidebar */}
            {selectedCategoryGroup && (
              <div className="w-64 p-6 bg-gray-50 border-r">
                <h3 className="text-md font-semibold text-gray-700 mb-4">Subcategories</h3>
                <div className="space-y-2">
                  {categoryGroupToSubCategories[selectedCategoryGroup].map((sub) => (
                    <div
                      key={sub}
                      onClick={() => handleSubCategorySelect(sub)}
                      className={`flex items-center p-3 rounded-md cursor-pointer transition-all duration-200 ${
                        selectedSubCategory === sub
                          ? "bg-blue-100 border-blue-500"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <div className="text-2xl mr-2">{subCategoryIcons[sub]}</div>
                      <span className="text-sm font-medium">{sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Main Content */}
            <div className="flex-1 p-6">
              <form onSubmit={handleSubmit}>
                {/* Image Upload and Price */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Image Upload */}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Product Images</h2>
                    <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6">
                      <div className="flex flex-col items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <p className="mt-2 text-sm text-gray-600">Drag and drop or click to upload</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="mt-4 block w-full text-sm text-gray-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  {/* Price Section */}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Pricing</h2>
                    <div className="bg-gray-50 border border-gray-300 rounded-lg p-6">
                      <div className="mb-10">
                        <label className="block text-sm font-medium text-gray-700 mb-1 mt-5">Price</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">Rs</span>
                          </div>
                          <input
                            type="number"
                            name="price"
                            id="price"
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md p-3"
                            placeholder="0.00"
                            aria-describedby="price-currency"
                            value={price}
                            onChange={handlePriceChange}
                            required
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm" id="price-currency">INR</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dynamic Category Form */}
                {selectedCategoryGroup && selectedSubCategory && formCategories[selectedCategoryGroup]?.[selectedSubCategory] ? (
                  <div className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {formCategories[selectedCategoryGroup][selectedSubCategory].map((field, index) => (
                        <div key={index} className={`${field.type === FormFieldType.Description ? "col-span-1 md:col-span-2" : "col-span-1"}`}>
                          {renderField(field)}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-16 text-center">
                    <div className="text-6xl mb-4">👈</div>
                    <h3 className="text-xl font-semibold text-gray-700">Select a category and subcategory</h3>
                    <p className="text-gray-500 mt-2">Choose a category and subcategory to see relevant form fields</p>
                  </div>
                )}

                {/* Action buttons */}
                <div className="bg-gray-50 flex justify-end space-x-4 border-t pt-6">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-3 bg-white border border-gray-300 rounded-md shadow-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 border border-transparent rounded-md shadow-sm font-medium text-white hover:bg-blue-700"
                    disabled={!selectedCategoryGroup || !selectedSubCategory}
                  >
                    List Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingPage;
