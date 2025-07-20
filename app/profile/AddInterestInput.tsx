import React, { useRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";

interface AddInterestInputProps {
  value: string;
  interests: string[];
  onChange: (val: string) => void;
  onAdd: (val: string) => void;
  onClear: () => void;
}

export const AddInterestInput: React.FC<AddInterestInputProps> = ({
  value,
  interests,
  onChange,
  onAdd,
  onClear,
}) => {
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleAdd = () => {
    const trimmed = value.trim();
    if (!trimmed) {
      setError("Interest cannot be empty.");
      return;
    }
    if (interests.map(i => i.toLowerCase()).includes(trimmed.toLowerCase())) {
      setError("Interest already added.");
      return;
    }
    setError("");
    onAdd(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAdd();
    } else if (e.key === "Escape") {
      onClear();
      setError("");
    }
  };

  return (
    <div className="flex mt-2 gap-2 items-center w-full max-w-md">
      <Input
        ref={inputRef}
        type="text"
        placeholder="Add interest..."
        value={value}
        onChange={e => {
          onChange(e.target.value);
          if (error) setError("");
        }}
        onKeyDown={handleKeyDown}
        className={
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-400"
            : ""
        }
        aria-label="Add research interest"
      />
      {value && (
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => {
            onClear();
            setError("");
          }}
          aria-label="Clear input"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      <Button
        type="button"
        size="sm"
        onClick={handleAdd}
        disabled={!value.trim() || interests.map(i => i.toLowerCase()).includes(value.trim().toLowerCase())}
        variant="outline"
        aria-label="Add interest"
      >
        <Plus className="h-4 w-4 mr-1" /> Add
      </Button>
      {error && (
        <span className="ml-2 text-xs text-red-600 animate-shake">{error}</span>
      )}
    </div>
  );
};

export default AddInterestInput;
