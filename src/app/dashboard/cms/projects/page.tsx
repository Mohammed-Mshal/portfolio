import CreateLinkProject from '@/actions/CreateLinkProject'
import CreateProject from '@/actions/CreateProject'
import CreateToolProject from '@/actions/CreateToolProject'
import PopupLinksProject from '@/app/components/PopupProjects/PopupLinksProject'
import PopupProjects from '@/app/components/PopupProjects/PopupProjects'
import PopupToolsProject from '@/app/components/PopupProjects/PopupToolsProject'
import DeleteProject from '@/data/projects/DeleteProject'
import DeleteProjectLink from '@/data/projects/DeleteProjectLink'
import DeleteProjectTool from '@/data/projects/DeleteProjectTool'
import EditProject from '@/data/projects/EditProject'
import EditProjectLink from '@/data/projects/EditProjectLink'
import EditProjectTool from '@/data/projects/EditProjectTool'
import { GetProjectLinks } from '@/data/projects/GetPorjectLinks'
import { GetProjects } from '@/data/projects/GetProjects'
import { GetProjectTools } from '@/data/projects/GetProjectTools'
import { verifySession } from '@/libs/session'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'
import { FiPlusCircle } from 'react-icons/fi'

export default async function Projects() {
  const session = await verifySession()
  if (!session) {
    redirect('/dashboard/auth/login')
  }
  const resGetProjects = await GetProjects()
  const resGetProjectLinks = await GetProjectLinks()
  const resGetProjectTools = await GetProjectTools()
  return (
    <div className='social_media'>
      <div className="container mx-auto">
        <div className="row flex lg:gap-8 gap-4 flex-col">
          <div className="col-12">
            <h1 className="text-white font-bold text-4xl">Projects</h1>
          </div>
          <div className="col-12 py-8 bg-white/5 p-8 rounded-xl lg:gap-8 gap-4 flex flex-col">
            <div className="header-container flex justify-between items-stretch">
              <h3 className="title lg:text-2xl md:text-xl text-lg font-bold">
                List Projects
              </h3>
              <PopupProjects
                textHeader='Add New Project'
                typeButton='ADD'
                iconButton={<FiPlusCircle className='text-4xl hover:text-indigo-600 transition-all duration-300' />}
                textButton={'Add Project'}
                styleButton='bg-indigo-600 py-1 px-8 hover:bg-indigo-700 border-2 border-indigo-600'
                action={CreateProject} />
            </div>
            <div className="body-descriptions flex flex-col gap-4 overflow-x-auto">
              <table className='border-collapse border border-white/10 table-auto  w-full'>
                <thead className='bg-indigo-600/70 text-white/80'>
                  <tr>
                    <th className='text-start px-4 py-2 border border-white/10'>
                      ID
                    </th>
                    <th className='text-center px-4 py-2 border border-white/10'>
                      Title
                    </th>
                    <th className='text-center px-4 py-2 border border-white/10'>
                      Preview Image
                    </th>
                    <th className='text-center px-4 py-2 border border-white/10'>
                      Description
                    </th>
                    <th className='text-center px-4 py-2 border border-white/10'>
                      Tools
                    </th>
                    <th className='text-center px-4 py-2 border border-white/10'>
                      Links
                    </th>
                    <th className='text-center px-4 py-2  border border-white/10'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    resGetProjects.data?.projects.length === 0 ?
                      <tr>
                        <td colSpan={7}>
                          <p className='text-center text-white/80 py-4'>
                            No Projects found
                          </p>
                        </td>
                      </tr>
                      :
                      resGetProjects.data?.projects.map((item) => {
                        return <tr key={item.id} className='md:text-lg text-base'>
                          <td className='px-4 py-2 border border-white/10'>
                            {item.id}
                          </td>
                          <td className='px-4 py-2 border border-white/10 text-center'>
                            {item.title}
                          </td>
                          <td className='px-4 py-2 border border-white/10 text-center'>
                            <div className="container-image flex justify-center">
                              <Image src={item.image} alt={item.title} height={150} width={200} />
                            </div>
                          </td>
                          <td className='px-4 py-2 border border-white/10 text-center max-w-[300px]'>
                            {item.description}
                          </td>
                          <td className='px-4 py-2 border border-white/10 text-center'>
                          {  item.tools.map((e,i) => {
                              return <span key={e.id}>{e.title}{i+1<item.tools.length&&<span>,</span>}</span>
                          })}
                          </td>
                          <td className='px-4 py-2 border border-white/10 text-center'>
                          {  item.links.map((e,i) => {
                              return <span key={e.id}><a  href={e.link} className='transition-all hover:text-indigo-700 underline'>{e.title}</a>{i+1<item.links.length&&<span>,</span>} </span>
                          })}
                          </td>
                          <td className='px-4 py-2 border border-white/10 text-center justify-center'>
                            <div className="actions flex gap-4">
                              <input type="hidden" value={item.id} />
                                <PopupProjects
                                  styleButton='bg-red-500 text-white hover:bg-red-700'
                                  textHeader='Are you Sure From Deleting Project?'
                                  typeButton='DELETE'
                                  textButton={'Delete'}
                                  idProject={item.id}
                                  titleProject={item.title}
                                  descriptionProject={item.description}
                                  action={DeleteProject} />
                                <PopupProjects
                                  textHeader='Edit Project'
                                  typeButton='EDIT'
                                  textButton={'Edit'}
                                  styleButton='bg-green-600 text-white hover:bg-green-700'
                                  idProject={item.id}
                                  titleProject={item.title}
                                  descriptionProject={item.description}
                                  action={EditProject} />
                            </div>
                          </td>
                        </tr>
                      })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-12 py-8 bg-white/5 p-8 rounded-xl lg:gap-8 gap-4 flex flex-col">
            <div className="header-container flex justify-between items-stretch">
              <h3 className="title lg:text-2xl md:text-xl text-lg font-bold">
                List Project Links
              </h3>
              <PopupLinksProject
                textHeader='Add New Link'
                typeButton='Add'
                iconButton={<FiPlusCircle className='text-4xl hover:text-indigo-600 transition-all duration-300' />}
                textButton={'Add Project'}
                styleButton='bg-indigo-600 py-1 px-8 hover:bg-indigo-700 border-2 border-indigo-600'
                listProject={resGetProjects.data?.projects}
                action={CreateLinkProject} />
            </div>
            <div className="body-descriptions flex flex-col gap-4 w-full max-w-full overflow-x-auto">
              <table className='border-collapse border border-white/10 w-full max-w-full'>
                <thead className='bg-indigo-600/70 text-white/80'>
                  <tr>
                    <th className='text-start px-4 py-2 border border-white/10'>
                      ID
                    </th>
                    <th className='text-center px-4 py-2 border border-white/10'>
                      Title
                    </th>
                    <th className='text-center px-4 py-2 border border-white/10'>
                      Preview Icon
                    </th>
                    <th className='text-center px-4 py-2 border border-white/10'>
                      Link
                    </th>
                    <th className='text-center px-4 py-2 border border-white/10'>
                      Project Name
                    </th>
                    <th className='text-center px-4 py-2  border border-white/10'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    resGetProjectLinks.data?.projectLinks.length === 0 ?
                      <tr>
                        <td colSpan={6}>
                          <p className='text-center text-white/80 py-4'>
                            No Links found
                          </p>
                        </td>
                      </tr>
                      :
                      resGetProjectLinks.data?.projectLinks.map((item) => {
                        return <tr key={item.id} className='md:text-lg text-base'>
                          <td className='px-4 py-2 border border-white/10'>
                            {item.id}
                          </td>
                          <td className='px-4 py-2 border border-white/10 text-center'>
                            {item.title}
                          </td>
                          <td className='px-4 py-2 border border-white/10 text-center'>
                            <div className="container-image flex justify-center items-center">
                              <Image src={item.icon} alt={item.title} height={50} width={50} objectFit='contain' />
                            </div>
                          </td>
                          <td className='px-4 py-2 border border-white/10 text-center'>
                            <a href={item.link} className='transition-all hover:text-indigo-700'>
                              {item.link}
                            </a>
                          </td>
                          <td className='px-4 py-2 border border-white/10 text-center'>
                            {item.Projects.title}
                          </td>
                          <td className='px-4 py-2 border border-white/10 text-center justify-center'>
                            <div className="actions flex gap-4">
                              <input type="hidden" value={item.id} />
                              <PopupLinksProject action={DeleteProjectLink} itemId={item.id} textButton='Delete' textHeader='Are you Sure From Deleting Link?' styleButton='bg-red-500 text-white hover:bg-red-700' typeButton='Delete' />
                              <PopupLinksProject action={EditProjectLink} itemId={item.id}  textButton='Edit' textHeader='Edit Link' styleButton='bg-green-600 text-white hover:bg-green-700' typeButton='Edit' nameLink={item.title} link={item.link} />
                            </div>
                          </td>
                        </tr>
                      })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-12 py-8 bg-white/5 p-8 rounded-xl lg:gap-8 gap-4 flex flex-col">
            <div className="header-container flex justify-between items-stretch">
              <h3 className="title lg:text-2xl md:text-xl text-lg font-bold">
                List Tools
              </h3>
              <PopupToolsProject
                textHeader='Add New Tool'
                typeButton='Add'
                iconButton={<FiPlusCircle className='text-4xl hover:text-indigo-600 transition-all duration-300' />}
                textButton={'Add Tool'}
                styleButton='bg-indigo-600 py-1 px-8 hover:bg-indigo-700 border-2 border-indigo-600'
                listProject={resGetProjects.data?.projects}
                action={CreateToolProject} />
            </div>
            <div className="body-descriptions flex flex-col gap-4 w-full max-w-full overflow-x-auto">
              <table className='border-collapse border border-white/10  w-full max-w-full'>
                <thead className='bg-indigo-600/70 text-white/80'>
                  <tr>
                    <th className='text-start px-4 py-2 border border-white/10'>
                      ID
                    </th>
                    <th className='text-center px-4 py-2 border border-white/10'>
                      Title
                    </th>
                    <th className='text-center px-4 py-2 border border-white/10'>
                      Project Name
                    </th>
                    <th className='text-center px-4 py-2  border border-white/10'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    resGetProjectTools.data?.projectTools.length === 0 ?
                      <tr>
                        <td colSpan={6}>
                          <p className='text-center text-white/80 py-4'>
                            No Links found
                          </p>
                        </td>
                      </tr>
                      :
                      resGetProjectTools.data?.projectTools.map((item) => {
                        return <tr key={item.id} className='md:text-lg text-base'>
                          <td className='px-4 py-2 border border-white/10'>
                            {item.id}
                          </td>
                          <td className='px-4 py-2 border border-white/10 text-center'>
                            {item.title}
                          </td>
                          <td className='px-4 py-2 border border-white/10 text-center'>
                            {item.Projects?.title}
                          </td>
                          <td className='px-4 py-2 border border-white/10 text-center justify-center'>
                            <div className="actions flex gap-4">
                              <input type="hidden" value={item.id} />
                              <PopupToolsProject action={DeleteProjectTool} itemId={item.id} textButton='Delete' textHeader='Are you Sure From Deleting Tool?' styleButton='bg-red-500 text-white hover:bg-red-700' typeButton='Delete' />
                              <PopupToolsProject action={EditProjectTool} itemId={item.id}  textButton='Edit' textHeader='Edit Tool' styleButton='bg-green-600 text-white hover:bg-green-700' typeButton='Edit' title={item.title} listProject={resGetProjects.data?.projects}/>
                            </div>
                          </td>
                        </tr>
                      })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
