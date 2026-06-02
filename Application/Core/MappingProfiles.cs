

using Application.Activities.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core
{
    // Configure AutoMapper
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            // [Registration]
            // Tell AutoMapper where we're going to map 
            // from and what we're going to map to?
            CreateMap<Activity, Activity>();
            CreateMap<CreateActivityDto, Activity>();
        }
    }
}