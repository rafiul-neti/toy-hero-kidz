import LoginForm from "@/components/Auth/LoginForm";
import SocialLogin from "@/components/Buttons/SocialLogin";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to HeroKidz
        </h1>

        {/* Form */}
        <LoginForm />

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="grow h-px bg-gray-300" />
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="grow h-px bg-gray-300" />
        </div>

        {/* Google login */}
        <SocialLogin />

      </div>
    </div>
  );
};

export default LoginPage;
