# JSON Schema Builder
![Next.js](https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Fun Project](https://img.shields.io/badge/Built%20For-Fun-FF69B4?style=for-the-badge)

A minimal JSON schema builder built with **Next.js**, **TypeScript**, and **Tailwind CSS**, designed for real-time schema editing with full nesting support.

## Live Demo
[Click Here](https://json-schema-builder-gules.vercel.app/) to see the live demo.

## Problem Statement

The goal was to create a dynamic and interactive JSON schema editor that allows users to:

- Realtime edit schema structure.
- Support nested fields (deep nesting allowed).
- Maintain schema as a **valid JSON object**, not an array of field definitions.
- Allow **custom key names** for all key fields.
- Enable **editing and deletion** at any nesting level.

### 🧪 Example Output

```json
{
  "Name": {
    "First Name": "string",
    "Middle Name": "string",
    "Last Name": "string"
  },
  "Phone": "number",
  "Address": {
    "City": "string",
    "State": "string"
  }
}
```

## ⚙️ Features

- **Custom Keys**: Define any key name at any level.
- **Nested Fields**: Add fields inside other fields (recursive nesting).
- **Real-time Editing**: All changes reflect instantly in the schema view.
- **Delete Support**: Delete fields from any level of nesting.
- **Minimal UI**: Clean and intuitive interface using Tailwind CSS.

## Preview
<img width="1918" height="938" alt="image" src="https://github.com/user-attachments/assets/faa81a1e-eb6a-4f12-8f29-131626896046" />



## 🛠️ Built With

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📦 Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/json-schema-builder.git
   cd json-schema-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.


## 🤝 Contributing

Pull requests are welcome. If you have suggestions for improvements or new features, feel free to open an issue or create a PR.

---

> Built for Fun using modern frontend tools.
