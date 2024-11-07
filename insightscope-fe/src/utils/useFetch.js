import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router";

export const useFetch = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchLogin = async (formData, setErrors) => {
    const newErrors = {};

    // Simple validation
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch(
          "https://insight-scope-pp2r.vercel.app/api/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );

        const data = await response.json();

        if (response.ok && data.accessToken) {
          toast({
            title: "Login successful!",
          });
          localStorage.setItem("authToken", data.accessToken);
          localStorage.setItem("user", JSON.stringify(data.user));

          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        } else {
          setErrors({ general: "Invalid email or password" });
          toast.error({ title: "Invalid email or password" });
        }
      } catch (error) {
        console.error("Login error:", error);
        setErrors({ general: "An error occurred during login" });
        toast.error({ title: "An error occurred during login" });
      }
    } else {
      setErrors(newErrors);
    }
  };

  return { fetchLogin };
};
