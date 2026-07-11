import DefaultModal from "@/components/example/ModalExample/DefaultModal";
import FormInModal from "@/components/example/ModalExample/FormInModal";
import FullScreenModal from "@/components/example/ModalExample/FullScreenModal";
import ModalBasedAlerts from "@/components/example/ModalExample/ModalBasedAlerts";
import VerticallyCenteredModal from "@/components/example/ModalExample/VerticallyCenteredModal";

export default function ModalsSection() {
  return (
    <section id="modals" className="scroll-mt-28">
      <h2 className="mb-5 text-2xl font-semibold text-gray-800 dark:text-white/90">
        Modals
      </h2>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2 xl:gap-6">
        <DefaultModal />
        <VerticallyCenteredModal />
        <FormInModal />
        <FullScreenModal />
        <ModalBasedAlerts />
      </div>
    </section>
  );
}
