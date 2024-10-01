import { addUserToProject } from '@/api/TeamApi';
import { TeamMember } from '@/types/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

type SearchResultProps = {
  user: TeamMember;
  reset: () => void;
};

export default function SearchResult({ user, reset }: SearchResultProps) {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addUserToProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projectTeam', projectId] });
      toast.success(data);
      reset();
      navigate(location.pathname, { replace: true });
    },
  });

  const handleAddUserToProject = () => {
    const data = {
      projectId,
      id: user._id,
    };
    mutate(data);
  };

  return (
    <>
      <p className="mt-10 text-center font-medium">Resultado:</p>
      <div className="flex justify-between place-items-center">
        <p>{user.name}</p>
        <button
          className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer"
          onClick={handleAddUserToProject}
        >
          Agregar al proyecto
        </button>
      </div>
    </>
  );
}