"use client";

import { useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type VariantInput = {
  size: string;
  color: string;
  stockQuantity: number;
  image: string;
};

const defaultVariant: VariantInput = {
  size: "",
  color: "",
  stockQuantity: 1,
  image: ""
};

export function AdminProductForm() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [price, setPrice] = useState("");
  const [compareAtPrice, setCompareAtPrice] = useState("");
  const [category, setCategory] = useState("FOOTWEAR");
  const [subCategory, setSubCategory] = useState("Sneakers");
  const [batchType, setBatchType] = useState("PREMIUM_PLUS_BATCH");
  const [isFeatured, setIsFeatured] = useState(true);
  const [tags, setTags] = useState("Premium, New Arrival");
  const [images, setImages] = useState<string[]>([""]);
  const [variants, setVariants] = useState<VariantInput[]>([{ ...defaultVariant }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const updateImage = (index: number, value: string) => {
    setImages((current) => current.map((item, itemIndex) => (itemIndex === index ? value : item)));
  };

  const updateVariant = <T extends keyof VariantInput>(
    index: number,
    key: T,
    value: VariantInput[T]
  ) => {
    setVariants((current) =>
      current.map((variant, variantIndex) =>
        variantIndex === index ? { ...variant, [key]: value } : variant
      )
    );
  };

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setDescription("");
    setShortDescription("");
    setPrice("");
    setCompareAtPrice("");
    setCategory("FOOTWEAR");
    setSubCategory("Sneakers");
    setBatchType("PREMIUM_PLUS_BATCH");
    setIsFeatured(true);
    setTags("Premium, New Arrival");
    setImages([""]);
    setVariants([{ ...defaultVariant }]);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setMessage(null);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          slug,
          description,
          shortDescription,
          price: Number(price),
          compareAtPrice: compareAtPrice ? Number(compareAtPrice) : null,
          category,
          subCategory,
          batchType,
          isFeatured,
          tags: tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
          images: images.filter(Boolean),
          variants: variants
            .filter((variant) => variant.size && variant.color)
            .map((variant) => ({
              ...variant,
              stockQuantity: Number(variant.stockQuantity)
            }))
        })
      });

      const result = (await response.json()) as { error?: string; title?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to create product.");
      }

      setMessage(`Created ${result.title ?? "product"} successfully.`);
      resetForm();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to create product."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-card">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-200">
          Add Product
        </p>
        <h2 className="text-3xl font-semibold text-white">Create a new listing</h2>
      </div>

      <div className="mt-8 space-y-6">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Title</label>
            <Input value={title} onChange={(event) => setTitle(event.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Slug</label>
            <Input value={slug} onChange={(event) => setSlug(event.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Price</label>
            <Input
              type="number"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Compare At Price</label>
            <Input
              type="number"
              value={compareAtPrice}
              onChange={(event) => setCompareAtPrice(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Category</label>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="h-11 w-full rounded-full border border-white/10 bg-white/5 px-4 text-sm text-white"
            >
              <option value="FOOTWEAR">Footwear</option>
              <option value="CLOTHING">Clothing</option>
              <option value="ACCESSORIES">Accessories</option>
              <option value="WOMEN">Women</option>
              <option value="KIDS">Kids</option>
              <option value="PERFUMES">Perfumes</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Sub Category</label>
            <Input
              value={subCategory}
              onChange={(event) => setSubCategory(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Batch Type</label>
            <select
              value={batchType}
              onChange={(event) => setBatchType(event.target.value)}
              className="h-11 w-full rounded-full border border-white/10 bg-white/5 px-4 text-sm text-white"
            >
              <option value="PREMIUM_PLUS_BATCH">Premium Plus Batch</option>
              <option value="DOT_PERFECT">Dot Perfect</option>
              <option value="ONE_TO_ONE">1:1</option>
              <option value="HOP_BATCH">HOP Batch</option>
            </select>
          </div>
          <label className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zinc-300">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(event) => setIsFeatured(event.target.checked)}
              className="h-4 w-4"
            />
            Featured on homepage
          </label>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Short Description</label>
          <Input
            value={shortDescription}
            onChange={(event) => setShortDescription(event.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Description</label>
          <Textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Tags</label>
          <Input
            value={tags}
            onChange={(event) => setTags(event.target.value)}
            placeholder="Premium, Jordan, Sneaker"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-300">Product Images</label>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setImages((current) => [...current, ""])}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Image
            </Button>
          </div>
          {images.map((image, index) => (
            <div key={`image-${index}`} className="flex gap-3">
              <Input
                value={image}
                onChange={(event) => updateImage(index, event.target.value)}
                placeholder="https://images.unsplash.com/..."
              />
              {images.length > 1 ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setImages((current) => current.filter((_, itemIndex) => itemIndex !== index))
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              ) : null}
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-300">Variants</label>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setVariants((current) => [...current, { ...defaultVariant }])}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Variant
            </Button>
          </div>

          {variants.map((variant, index) => (
            <div
              key={`variant-${index}`}
              className="grid gap-3 rounded-3xl border border-white/10 bg-slateGlow-900/70 p-4 md:grid-cols-[0.8fr_1fr_0.8fr_1.4fr_auto]"
            >
              <Input
                value={variant.size}
                onChange={(event) => updateVariant(index, "size", event.target.value)}
                placeholder="42 / M / 100ml"
              />
              <Input
                value={variant.color}
                onChange={(event) => updateVariant(index, "color", event.target.value)}
                placeholder="Black / Mocha"
              />
              <Input
                type="number"
                value={String(variant.stockQuantity)}
                onChange={(event) =>
                  updateVariant(index, "stockQuantity", Number(event.target.value))
                }
                placeholder="Stock"
              />
              <Input
                value={variant.image}
                onChange={(event) => updateVariant(index, "image", event.target.value)}
                placeholder="Variant image URL (optional)"
              />
              {variants.length > 1 ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setVariants((current) =>
                      current.filter((_, variantIndex) => variantIndex !== index)
                    )
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              ) : null}
            </div>
          ))}
        </div>

        {message ? (
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
            {message}
          </div>
        ) : null}
        {errorMessage ? (
          <div className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-100">
            {errorMessage}
          </div>
        ) : null}

        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Product
            </>
          ) : (
            "Create Product"
          )}
        </Button>
      </div>
    </section>
  );
}
