import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function StatefulModal({title, desc, open, onOpenChange }: { title: string; desc: string; open: boolean; onOpenChange: (o: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {desc}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
