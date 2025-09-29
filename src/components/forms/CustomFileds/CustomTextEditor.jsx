// src/components/forms/CustomFileds/CustomTextEditor.jsx
import React, { useRef } from "react";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

function CustomTextEditor({ name, control, label = "Content", rules = {} }) {
  const editorRef = useRef(null);

  return (
    <div className="w-full">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Editor
              apiKey="lsm8vcnnrspl2e72cz1p8xd5smhdk3xj3hob14i7fwy29lap"
              onInit={(evt, editor) => {
                editorRef.current = editor;
                // Set the content after editor initialization if value exists
                if (value) {
                  editor.setContent(value);
                }
              }}
              initialValue={value || ""}
              value={value}
              onEditorChange={(content) => {
                onChange(content);
              }}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  "advlist autolink lists link image charmap preview anchor",
                  "searchreplace visualblocks visualchars code fullscreen",
                  "insertdatetime media table code help wordcount",
                  "emoticons template paste pagebreak nonbreaking",
                  "directionality codesample importcss",
                ],
                toolbar:
                  "undo redo | blocks | bold italic underline strikethrough | forecolor backcolor | " +
                  "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | link image media table | code fullscreen preview | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                setup: (editor) => {
                  // This ensures the editor is properly initialized before setting content
                  editor.on("init", () => {
                    if (value) {
                      editor.setContent(value);
                    }
                  });
                },
              }}
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
}

export default CustomTextEditor;
