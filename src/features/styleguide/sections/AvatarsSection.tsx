import ComponentCard from "@/components/common/ComponentCard";
import Avatar from "@/components/ui/avatar/Avatar";

export default function AvatarsSection() {
  return (
    <section id="avatars" className="scroll-mt-28">
      <h2 className="mb-5 text-2xl font-semibold text-gray-800 dark:text-white/90">
        Avatars
      </h2>
      <div className="space-y-5 sm:space-y-6">
        <ComponentCard title="Default Avatar">
          <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Avatar src="/images/user/user-01.jpg" size="xsmall" />
            <Avatar src="/images/user/user-01.jpg" size="small" />
            <Avatar src="/images/user/user-01.jpg" size="medium" />
            <Avatar src="/images/user/user-01.jpg" size="large" />
            <Avatar src="/images/user/user-01.jpg" size="xlarge" />
            <Avatar src="/images/user/user-01.jpg" size="xxlarge" />
          </div>
        </ComponentCard>
        <ComponentCard title="Avatar with online indicator">
          <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Avatar
              src="/images/user/user-01.jpg"
              size="xsmall"
              status="online"
            />
            <Avatar
              src="/images/user/user-01.jpg"
              size="small"
              status="online"
            />
            <Avatar
              src="/images/user/user-01.jpg"
              size="medium"
              status="online"
            />
            <Avatar
              src="/images/user/user-01.jpg"
              size="large"
              status="online"
            />
          </div>
        </ComponentCard>
        <ComponentCard title="Avatar with offline indicator">
          <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Avatar
              src="/images/user/user-01.jpg"
              size="medium"
              status="offline"
            />
            <Avatar
              src="/images/user/user-01.jpg"
              size="large"
              status="offline"
            />
            <Avatar
              src="/images/user/user-01.jpg"
              size="xlarge"
              status="offline"
            />
          </div>
        </ComponentCard>
        <ComponentCard title="Avatar with busy indicator">
          <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Avatar src="/images/user/user-01.jpg" size="medium" status="busy" />
            <Avatar src="/images/user/user-01.jpg" size="large" status="busy" />
            <Avatar src="/images/user/user-01.jpg" size="xlarge" status="busy" />
          </div>
        </ComponentCard>
      </div>
    </section>
  );
}
